#!/bin/bash

# Production deployment script for Convex backend
# Loads CONVEX_URL and DEPLOY_KEY from .env file

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# Load environment variables from .env
if [ -f "$PROJECT_DIR/.env" ]; then
    export $(grep -v '^#' "$PROJECT_DIR/.env" | xargs)
else
    echo "Error: .env file not found at $PROJECT_DIR/.env"
    exit 1
fi

# Validate required environment variables
if [ -z "$CONVEX_URL" ]; then
    echo "Error: CONVEX_URL is not set in .env"
    exit 1
fi

if [ -z "$DEPLOY_KEY" ]; then
    echo "Error: DEPLOY_KEY is not set in .env"
    exit 1
fi

echo "🚀 Deploying Convex backend to production..."
echo "   URL: $CONVEX_URL"

# Export CONVEX_DEPLOY_KEY for the convex deploy command
export CONVEX_DEPLOY_KEY="$DEPLOY_KEY"

# Deploy to production (uses CONVEX_DEPLOY_KEY env var automatically)
npx convex deploy -y

echo "✅ Production deployment complete!"
