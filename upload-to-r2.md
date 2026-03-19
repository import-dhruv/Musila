# Upload Video to Cloudflare R2

## Method 1: Dashboard Upload (Easiest)
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to R2 → Your Bucket
3. Click "Upload" button
4. Select your `background.mp4` file
5. Wait for upload to complete
6. Click on uploaded file to get public URL
7. Copy the URL and replace in `src/App.jsx`

## Method 2: Using Wrangler CLI (Advanced)
```bash
# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Upload file
wrangler r2 object put musila-assets/background.mp4 --file=public/background.mp4

# Get public URL
# Format: https://pub-[bucket-id].r2.dev/background.mp4
```

## Benefits of Cloud Storage:
✅ **No decode errors** - Cloudflare's CDN optimizes video delivery
✅ **Faster loading** - Global CDN with edge caching
✅ **Better performance** - Reduces your app bundle size
✅ **Scalability** - Handles traffic spikes automatically
✅ **Cost effective** - 10GB free tier, then $0.015/GB
✅ **Reliability** - 99.9% uptime SLA

## After Upload:
1. Replace the VIDEO_URL in `src/App.jsx` with your R2 URL
2. Remove `background.mp4` from your `public/` folder
3. Update your `.gitignore` to exclude large media files
4. Deploy your app - much faster builds!

## Example URL Format:
```javascript
const VIDEO_URL = "https://pub-abc123def456.r2.dev/background.mp4";
```