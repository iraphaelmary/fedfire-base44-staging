#!/usr/bin/env node

import { spawn, execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, unlinkSync, chmodSync, createWriteStream } from 'fs';
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
  
  cleanConvexConfig();
  
  try {
    // 1. Prepare Backend Binary
    await prepareBackend();

    // 2. Start Backend Process
    console.log('🔥 Starting Convex backend process...');
    const backendProcess = spawn(`./${BACKEND_BINARY}`, [], {
      cwd: projectRoot,
      stdio: 'pipe', // Pipe so we can suppress output but keep it alive? Or inherit to see logs?
      // Let's inherit stderr so we see errors, ignore stdout to reduce noise? 
      // User says "Keep this running in one terminal".
      // We will run it in background of this script.
      stdio: ['ignore', 'ignore', 'inherit'] 
    });

    backendProcess.on('error', (err) => {
      console.error('❌ Failed to start backend:', err);
      process.exit(1);
    });

    // Clean up backend on exit
    process.on('SIGINT', () => {
      console.log('\n🛑 Stopping backend...');
      backendProcess.kill();
      process.exit(0);
    });
    
    // Give backend a moment to start
    await new Promise(r => setTimeout(r, 2000));

    // 3. Start Convex CLI + Vite
    console.log('✨ Starting connection and Vite dev server...');
    const connectCmd = 'npx';
    const connectArgs = [
      'convex', 'dev',
      '--url', 'http://127.0.0.1:3210',
      '--admin-key', ADMIN_KEY,
      '--run-sh', 'npm run dev:vite -- --host'
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
