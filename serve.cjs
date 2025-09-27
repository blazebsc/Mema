#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, 'dist');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  let pathname = parsedUrl.pathname;

  // Handle SPA routing - serve index.html for non-asset requests
  if (!pathname.includes('.') && pathname !== '/') {
    pathname = '/index.html';
  }
  
  if (pathname === '/') {
    pathname = '/index.html';
  }

  const filePath = path.join(DIST_DIR, pathname);
  
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // File doesn't exist, serve index.html for SPA routing
      const indexPath = path.join(DIST_DIR, 'index.html');
      fs.readFile(indexPath, (err, data) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(data);
        }
      });
      return;
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
      } else {
        const ext = path.extname(filePath);
        const mimeType = mimeTypes[ext] || 'text/plain';
        
        // Set cache headers for assets
        if (pathname.startsWith('/assets/')) {
          res.writeHead(200, {
            'Content-Type': mimeType,
            'Cache-Control': 'public, max-age=31536000, immutable'
          });
        } else {
          res.writeHead(200, { 'Content-Type': mimeType });
        }
        
        res.end(data);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`
🚀 Mema Chat is now live and accessible!

   Local:    http://localhost:${PORT}
   Network:  http://$(hostname -I | awk '{print $1}'):${PORT}

📱 Features available:
   • Professional home page with animations
   • Real-time chat application at /chat
   • Mobile responsive design
   • Dark mode support

🎯 Quick links:
   • Home:  http://localhost:${PORT}/
   • Chat:  http://localhost:${PORT}/chat

Press Ctrl+C to stop the server
  `);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down server...');
  server.close(() => {
    console.log('✅ Server closed successfully');
    process.exit(0);
  });
});