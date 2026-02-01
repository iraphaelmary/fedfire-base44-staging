#!/usr/bin/env node

import { spawn, execSync, spawnSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, unlinkSync, chmodSync, createWriteStream, writeFileSync } from 'fs';
import { randomBytes, generateKeyPairSync } from 'crypto';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

const BACKEND_BINARY = 'convex-local-backend';
const BACKEND_ZIP = 'convex-backend.zip';
const BACKEND_URL = 'https://github.com/get-convex/convex-backend/releases/latest/download/convex-local-backend-x86_64-unknown-linux-gnu.zip';
// Admin key from user instructions
const ADMIN_KEY = '0135d8598650f8f5cb0f30c34ec2e2bb62793bc28717c8eb6fb577996d50be5f4281b59181095065c5d0f86a2c31ddbe9b597ec62b47ded69782cd';

/**
 * Clean previous Convex configuration files to ensure fresh local setup
 */
function cleanConvexConfig() {
  const filesToClean = [
    join(projectRoot, '.env.local'),
    join(projectRoot, 'convex.json')
  ];

  filesToClean.forEach(file => {
    if (existsSync(file)) {
      try {
        unlinkSync(file);
        console.log(`🧹 Cleaned: ${file.split('/').pop()}`);
      } catch (err) {
        console.warn(`⚠️  Could not clean ${file}: ${err.message}`);
      }
    }
  });

  // Generate and write .env.local with JWT_PRIVATE_KEY (PKCS#8 PEM) and AUTH_SECRET
  const { privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
  });
  const jwtKey = privateKey;

  // Generate a random 32-byte secret for AUTH_SECRET
  const authSecret = randomBytes(32).toString('hex');

  // Resend API Key for email verification
  const resendApiKey = 're_GVxNMych_25S2rFfBqjr4dhT9D9fLvEjn';

  const envContent = `JWT_PRIVATE_KEY="${jwtKey.split('\n').join('\\n')}"\nAUTH_SECRET="${authSecret}"\n\nVITE_CONVEX_URL=http://127.0.0.1:3210\n\nRESEND_API_KEY=${resendApiKey}\nSITE_URL=http://localhost:5173\n`;
  writeFileSync(join(projectRoot, '.env.local'), envContent);
  console.log('🔑 Generated .env.local with JWT_PRIVATE_KEY, AUTH_SECRET, and RESEND_API_KEY');
  return { jwtKey, authSecret, resendApiKey };
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        // Handle redirect
        downloadFile(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      unlinkSync(dest);
      reject(err);
    });
  });
}

async function prepareBackend() {
  const binaryPath = join(projectRoot, BACKEND_BINARY);

  if (existsSync(binaryPath)) {
    console.log('✅ Local backend binary found.');
    return;
  }

  console.log('⬇️  Downloading Convex local backend binary...');
  const zipPath = join(projectRoot, BACKEND_ZIP);

  try {
    await downloadFile(BACKEND_URL, zipPath);
    console.log('📦 Unzipping binary...');
    execSync(`unzip -o ${zipPath} -d ${projectRoot}`);
    chmodSync(binaryPath, 0o755);
    unlinkSync(zipPath); // Clean up zip
    console.log('✅ Backend binary ready.');
  } catch (error) {
    throw new Error(`Failed to setup backend binary: ${error.message}`);
  }
}

async function main() {
  console.log('🚀 Starting FedFire development environment (Manual Mode)...\n');

  const { jwtKey, authSecret, resendApiKey } = cleanConvexConfig();

  try {
    // 1. Prepare Backend Binary
    await prepareBackend();

    // 2. Start Backend Process
    console.log('🔥 Starting Convex backend process (via Docker)...');

    // Use Docker to run the binary to avoid GLIBC issues on older hosts
    // We need to install ca-certificates AND set SSL env vars for bundled OpenSSL
    // Add --add-host for host.docker.internal to work on Linux
    const backendProcess = spawn('docker', [
      'run', '--rm',
      '-v', `${projectRoot}:/app`,
      '-w', '/app',
      '-p', '3210:3210',
      '-p', '3211:3211',
      '--add-host=host.docker.internal:host-gateway',
      '-e', 'SSL_CERT_FILE=/etc/ssl/certs/ca-certificates.crt',
      '-e', 'SSL_CERT_DIR=/etc/ssl/certs',
      'ubuntu:22.04',
      'bash', '-c', `apt-get update -qq && apt-get install -y -qq ca-certificates > /dev/null 2>&1 && update-ca-certificates > /dev/null 2>&1 && ./${BACKEND_BINARY}`
    ], {
      cwd: projectRoot,
      // Inherit stderr for errors, ignore stdout/stdin
      stdio: ['ignore', 'inherit', 'inherit']
    });

    backendProcess.on('error', (err) => {
      console.error('❌ Failed to start backend:', err);
      process.exit(1);
    });

    // Clean up all processes on exit
    let emailServerProcess = null; // Will be set later
    process.on('SIGINT', () => {
      console.log('\n🛑 Stopping all servers...');
      backendProcess.kill();
      if (emailServerProcess) emailServerProcess.kill();
      process.exit(0);
    });

    // Give backend a moment to start
    await new Promise(r => setTimeout(r, 2000));

    // 2.5 Set JWT_PRIVATE_KEY and AUTH_SECRET in Convex Backend
    console.log('🔐 Setting AUTH environment variables in backend...');
    try {
      // Use positional argument with NAME=VALUE syntax which sometimes helps CLIs
      // Or use single quotes and escape internal single quotes if any (PEM has none)
      const jwtCommand = `npx convex env set JWT_PRIVATE_KEY='${jwtKey}' --url http://127.0.0.1:3210 --admin-key ${ADMIN_KEY}`;
      execSync(jwtCommand, {
        cwd: projectRoot,
        stdio: 'inherit'
      });

      const authSecretCommand = `npx convex env set AUTH_SECRET='${authSecret}' --url http://127.0.0.1:3210 --admin-key ${ADMIN_KEY}`;
      execSync(authSecretCommand, {
        cwd: projectRoot,
        stdio: 'inherit'
      });

      // Set RESEND_API_KEY for email verification
      const resendKeyCommand = `npx convex env set RESEND_API_KEY='${resendApiKey}' --url http://127.0.0.1:3210 --admin-key ${ADMIN_KEY}`;
      execSync(resendKeyCommand, {
        cwd: projectRoot,
        stdio: 'inherit'
      });

      // Set SITE_URL
      const siteUrlCommand = `npx convex env set SITE_URL='http://localhost:5173' --url http://127.0.0.1:3210 --admin-key ${ADMIN_KEY}`;
      execSync(siteUrlCommand, {
        cwd: projectRoot,
        stdio: 'inherit'
      });
    } catch (err) {
      console.warn('⚠️  Could not set AUTH environment variables in backend. You may need to set them manually.');
    }

    // 3. Start Email Proxy Server (bypasses Convex SSL issues)
    console.log('📬 Starting email proxy server...');
    emailServerProcess = spawn('node', ['--dns-result-order=ipv4first', 'scripts/email-server.js'], {
      cwd: projectRoot,
      stdio: 'inherit',
      env: {
        ...process.env,
        RESEND_API_KEY: resendApiKey
      }
    });

    emailServerProcess.on('error', (err) => {
      console.error('❌ Failed to start email server:', err);
    });

    // 4. Start Convex CLI + Vite
    console.log('✨ Starting connection and Vite dev server...');
    const connectCmd = 'npx';
    const connectArgs = [
      'convex', 'dev',
      '--url', 'http://127.0.0.1:3210',
      '--admin-key', ADMIN_KEY,
      '--run-sh', 'yarn run dev:vite -- --host'
    ];

    const cliProcess = spawn(connectCmd, connectArgs, {
      cwd: projectRoot,
      stdio: 'inherit',
      env: {
        ...process.env,
        CI: '1' // Ensure non-interactive
      }
    });

    cliProcess.on('close', (code) => {
      console.log('\n👋 Development servers stopped');
      backendProcess.kill();
      process.exit(code);
    });

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

main();
