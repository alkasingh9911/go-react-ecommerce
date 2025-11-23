# Deployment Guide

## Quick Deploy (Free Hosting)

### Backend: Render.com

1. **Sign up at https://render.com** with your GitHub account

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select `go-react-ecommerce`

3. **Configure Service**
   ```
   Name: ecommerce-backend
   Root Directory: backend
   Environment: Go
   Build Command: go build -o main .
   Start Command: ./main
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Copy your backend URL: `https://YOUR-APP.onrender.com`

5. **Add Sample Data**
   After deployment, create test data using these curl commands:
   
   ```bash
   # Create user
   curl -X POST https://YOUR-APP.onrender.com/users \
     -H "Content-Type: application/json" \
     -d '{"username":"testuser","password":"password123"}'
   
   # Create items
   curl -X POST https://YOUR-APP.onrender.com/items \
     -H "Content-Type: application/json" \
     -d '{"name":"Laptop","description":"High-performance laptop","price":999.99}'
   
   curl -X POST https://YOUR-APP.onrender.com/items \
     -H "Content-Type: application/json" \
     -d '{"name":"Mouse","description":"Wireless mouse","price":29.99}'
   
   curl -X POST https://YOUR-APP.onrender.com/items \
     -H "Content-Type: application/json" \
     -d '{"name":"Keyboard","description":"Mechanical keyboard","price":79.99}'
   
   curl -X POST https://YOUR-APP.onrender.com/items \
     -H "Content-Type: application/json" \
     -d '{"name":"Monitor","description":"4K monitor","price":399.99}'
   ```

### Frontend: Vercel

1. **Sign up at https://vercel.com** with your GitHub account

2. **Import Project**
   - Click "Add New" → "Project"
   - Select `go-react-ecommerce` repository

3. **Configure Project**
   ```
   Framework Preset: Create React App
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: build
   ```

4. **Add Environment Variable**
   - Click "Environment Variables"
   - Add:
     - Name: `REACT_APP_API_URL`
     - Value: `https://YOUR-BACKEND-URL.onrender.com` (from Render)

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment (2-3 minutes)
   - Your app will be live at: `https://YOUR-APP.vercel.app`

## Alternative: Netlify (Frontend)

1. Go to https://netlify.com
2. Sign up with GitHub
3. Click "Add new site" → "Import an existing project"
4. Select your repository
5. Configure:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/build`
6. Add environment variable:
   - `REACT_APP_API_URL` = your Render backend URL
7. Deploy

## Testing Your Live App

1. Visit your Vercel/Netlify URL
2. Login with:
   - Username: `testuser`
   - Password: `password123`
3. Test all features:
   - Add items to cart
   - View cart
   - Checkout
   - View order history

## Important Notes

- **Free Tier Limitations:**
  - Render free tier: Backend may sleep after 15 minutes of inactivity (takes 30s to wake up)
  - Vercel/Netlify: No limitations for frontend

- **Database:**
  - SQLite database will reset on Render restarts
  - For production, consider upgrading to PostgreSQL

- **CORS:**
  - Already configured in backend to accept all origins
  - No additional configuration needed

## Troubleshooting

**Backend not responding:**
- Wait 30 seconds (free tier wakes up from sleep)
- Check Render logs for errors

**Frontend can't connect to backend:**
- Verify `REACT_APP_API_URL` environment variable is set correctly
- Redeploy frontend after changing environment variables

**Login fails:**
- Make sure you created the test user using curl commands above
- Check backend logs on Render

## Cost

- **Render (Backend):** Free tier available
- **Vercel (Frontend):** Free tier available
- **Total Cost:** $0/month for hobby projects
