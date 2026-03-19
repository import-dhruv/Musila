# Musila - Vercel Deployment Guide

## 🚀 Pre-Deployment Steps

### 1. Upload Video to GitHub Releases
**IMPORTANT**: Before deploying, you must upload your background video to GitHub Releases:

1. Go to: https://github.com/import-dhruv/Musila/releases
2. Click **"Create a new release"**
3. **Tag version**: `v1.0.0`
4. **Release title**: `Musila v1.0.0 - Assets`
5. **Description**: `Background video and assets for Musila music player`
6. **Upload `background.mp4`** in the "Attach binaries" section
7. Click **"Publish release"**
8. **Copy the direct download URL** of the uploaded video
9. **Update `VIDEO_URL`** in `src/App.jsx` with the actual URL

### 2. Remove Large Files
```bash
# Remove the large video file from your repository
git rm public/background.mp4
git commit -m "Remove large video file - now hosted on GitHub Releases"
git push origin main
```

## 🌐 Deploy to Vercel

### Method 1: Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"New Project"**
4. **Import** your `Musila` repository
5. **Framework Preset**: Vite (auto-detected)
6. **Build Command**: `npm run build` (auto-detected)
7. **Output Directory**: `dist` (auto-detected)
8. Click **"Deploy"**

### Method 2: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (your account)
# - Link to existing project? N
# - Project name? musila
# - Directory? ./
# - Override settings? N
```

## ⚙️ Build Configuration

The project is pre-configured with:
- ✅ **Vite config** optimized for Vercel
- ✅ **vercel.json** with proper headers and caching
- ✅ **Build optimizations** (code splitting, minification)
- ✅ **Asset caching** for better performance
- ✅ **SPA routing** configuration

## 🎵 Audio File Handling

The `funkify.mp3` file (162MB) is included in the build because:
- It's essential for the music player functionality
- Vercel supports files up to 250MB
- It's cached with long-term headers for performance

## 🔧 Environment Variables (Optional)

If you want to make the video URL configurable:

1. In Vercel dashboard → Project → Settings → Environment Variables
2. Add: `VITE_VIDEO_URL` = `your-github-release-video-url`
3. Update code to use: `import.meta.env.VITE_VIDEO_URL`

## 📊 Performance Optimizations

- **Code splitting**: Vendor and Howler chunks separated
- **Asset caching**: 1-year cache for static assets
- **Minification**: Terser for optimal bundle size
- **External video**: Large video hosted on GitHub CDN
- **Preload optimization**: Metadata preloading for faster start

## 🚨 Troubleshooting

### Build Fails
- Ensure all dependencies are in `package.json`
- Check Node.js version compatibility
- Verify no large files in repository

### Video Not Loading
- Confirm GitHub release is public
- Check VIDEO_URL is correct
- Verify CORS headers (GitHub handles this automatically)

### Audio Issues
- Ensure `funkify.mp3` is in `public/` folder
- Check browser autoplay policies
- Verify Howler.js is properly loaded

## 🎯 Post-Deployment

After successful deployment:
1. **Test on mobile devices** - responsive design is implemented
2. **Check video loading** - should load from GitHub Releases
3. **Verify audio playback** - all tracks should work
4. **Test touch controls** - mobile-optimized interface

## 📈 Monitoring

Vercel provides:
- **Analytics** - page views, performance metrics
- **Function logs** - for debugging
- **Performance insights** - Core Web Vitals
- **Error tracking** - runtime errors

Your Musila app will be available at: `https://musila-[random].vercel.app`