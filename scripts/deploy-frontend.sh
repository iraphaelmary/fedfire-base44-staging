#!/bin/bash

# Frontend deployment script for Vercel

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_DIR"

echo "🚀 Deploying frontend to Vercel..."
vercel --prod

echo "✅ Frontend deployment complete!"
