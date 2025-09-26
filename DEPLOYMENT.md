# 🚀 Travel App Deployment Guide

## Deployment Options

### 1. **Railway** (Recommended for Full Stack)
- ✅ Hosts both frontend and backend
- ✅ Managed MongoDB available
- ✅ Free tier available
- ✅ Easy GitHub integration

**Steps:**
1. Connect GitHub repo to Railway
2. Create MongoDB database service
3. Deploy backend automatically
4. Deploy frontend on subdomain

### 2. **Vercel + Railway** (Production Ready)
- ✅ Vercel for frontend (amazing React support)
- ✅ Railway for backend + MongoDB
- ✅ Automatic deployments

### 3. **Render** (Budget Friendly)
- ✅ Free tier with good performance
- ✅ Supports both frontend and backend
- ✅ Built-in database management

### 4. **Netlify + Heroku**
- ✅ Netlify for frontend deployment
- ✅ Heroku for backend
- ✅ Easy to configure

## Pre-deployment Setup

### For MongoDB Database:
Set these environment variables:
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/travel-app
NODE_ENV=production
```

### For Frontend:
Ensure build scripts are properly configured in `frontend/package.json`:
- `build`: Creates production build
- `preview`: Tests local production build

## Quick Deploy to Railway:

1. **Sign up at Railway.app**
2. **Connect GitHub repository**
3. **Add MongoDB service**
4. **Deploy both backend and frontend**

Your app will be live at your Railway domain! 

## Environment Variables Needed:
- `MONGODB_URI`: Your MongoDB connection string
- `PORT`: Backend port (optional, defaults to 4000)
- `NODE_ENV`: Set to `production`
