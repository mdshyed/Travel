#!/bin/bash
# Railway deployment script for full-stack Travel App

echo "🚀 Starting Railway deployment..."

# Build frontend first
echo "📦 Building frontend..."
cd frontend
npm install
npm run build

# Move frontend build to where backend can serve it
cp -r dist ../backend_mongo/frontend-dist

echo "🎯 Building complete!"
echo "✅ Ready to start backend server"
