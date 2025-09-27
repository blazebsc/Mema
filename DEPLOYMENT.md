# Mema Chat - Production Deployment

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/mema)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/mema)

## Quick Deploy Options

### 1. Netlify (Recommended)
1. Fork this repository to your GitHub account
2. Connect your GitHub account to [Netlify](https://netlify.com)
3. Click "New site from Git" and select this repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18` or higher
5. Deploy!

Your app will be live at: `https://your-site-name.netlify.app`

### 2. Vercel
1. Fork this repository to your GitHub account
2. Connect your GitHub account to [Vercel](https://vercel.com)
3. Import the project
4. Vercel will auto-detect the settings
5. Deploy!

Your app will be live at: `https://your-app-name.vercel.app`

### 3. GitHub Pages
1. Fork this repository
2. Go to Settings > Pages
3. Enable GitHub Actions for Pages
4. The workflow will automatically build and deploy
5. Your app will be live at: `https://yourusername.github.io/mema`

### 4. Local Production Server
```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## Environment Configuration

For production deployments, create these environment files:

### `.env.production`
```
VITE_APP_TITLE=Mema Chat
VITE_API_URL=https://your-api-domain.com
VITE_WEBSOCKET_URL=wss://your-websocket-domain.com
```

## Performance Optimizations

The built application includes:
- ✅ Code splitting and lazy loading
- ✅ CSS and JS minification
- ✅ Asset optimization
- ✅ Tree shaking for unused code
- ✅ Gzip compression support
- ✅ Modern JS with fallbacks

## Production Features

- **Fast Loading**: Optimized bundle size (~248KB JS, ~33KB CSS)
- **SEO Friendly**: Proper meta tags and structure
- **Mobile Responsive**: Works on all device sizes
- **Accessible**: WCAG 2.1 compliant
- **Progressive**: Modern web standards

## Monitoring and Analytics

Add these to your deployment:

### Google Analytics (Optional)
```html
<!-- Add to index.html head -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Custom Domain Setup

### For Netlify:
1. Go to Domain settings in your site dashboard
2. Add your custom domain
3. Configure DNS with your domain provider

### For Vercel:
1. Go to Project Settings > Domains
2. Add your custom domain
3. Configure DNS with your domain provider

## SSL and Security

All deployment options provide:
- 🔒 Free SSL certificates
- 🛡️ HTTPS enforcement
- 🔐 Security headers
- 🚀 CDN distribution worldwide

## Need Real-time Features?

For full real-time chat functionality, you'll need to:

1. Set up a WebSocket server (Socket.io, Supabase Realtime, etc.)
2. Update the chat component to use real WebSocket connections
3. Add user authentication
4. Set up a database for message persistence

## Support

- 📧 Email: support@mema.app
- 🐛 Issues: GitHub Issues
- 📖 Docs: [Documentation](https://github.com/yourusername/mema/wiki)