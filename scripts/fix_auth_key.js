import { generateKeyPair, exportJWK } from 'jose';
import fs from 'fs';

async function main() {
  console.log("Generating key...");
  const { privateKey } = await generateKeyPair('RS256');
  const privateJwk = await exportJWK(privateKey);
  // convex-auth expects JWKS to be a JSON string of a JWKS object
  const jwks = { keys: [privateJwk] };
  const jwksString = JSON.stringify(jwks);

  let env = "";
  try {
    env = fs.readFileSync('.env.local', 'utf-8');
  } catch(e) {
    console.log("No .env.local found, creating new.");
  }

  // Filter out bad keys
  const lines = env.split('\n');
  const newLines = lines.filter(l => 
    !l.trim().startsWith('JWT_PRIVATE_KEY=') && 
    !l.trim().startsWith('JWKS=')
  );

  // Append new JWKS
  // We use single quotes to wrap the JSON to avoid shell issues if sourced, 
  // but strictly .env parsers might behave differently. 
  // Standard practice for complex values is usually no quotes if JSON, or single quotes.
  newLines.push(`JWKS='${jwksString}'`);

  fs.writeFileSync('.env.local', newLines.join('\n'));
  console.log('Fixed .env.local with new JWKS');
}

main().catch(console.error);
