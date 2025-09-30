# Mema Chat 💬

A modern, feature-rich real-time chat application built with React, TypeScript, Tailwind CSS, Socket.IO, and Vite.

![Mema Chat](https://img.shields.io/badge/Status-Live-brightgreen) ![Version](https://img.shields.io/badge/Version-1.0.0-blue) ![License](https://img.shields.io/badge/License-MIT-green)

## 🚀 Quick Start

```bash
npm install

# Run both frontend and backend
npm run dev:all

# Or run separately:
npm run dev          # Frontend only (http://localhost:5173)
npm run dev:backend  # Backend only (http://localhost:3001)

# Production
npm run build        # Build frontend
npm run server       # Start backend server
```

## ✨ Features

- **💬 Real-time Chat:** Instant messaging with WebSocket (Socket.IO)
- **👥 Multi-user Support:** Connect with multiple users simultaneously
- **📝 Message Features:** Reactions, replies, editing, search, emoji picker
- **👤 User System:** Colorful avatars, online status, typing indicators  
- **🎨 Modern UI:** Dark/light mode, smooth animations, mobile responsive
- **⚡ Live Updates:** Real-time user join/leave, message delivery status
- **🔧 Professional:** Video/voice call buttons, search, keyboard shortcuts

## 🛠 Tech Stack

### Frontend
- **React 19** + TypeScript for robust development
- **Tailwind CSS 4.1** for modern styling
- **Vite 7.1** for lightning-fast builds
- **Socket.IO Client** for real-time communication
- **Lucide React** for beautiful icons

### Backend
- **Node.js** + Express for server
- **Socket.IO** for WebSocket connections
- **CORS** for cross-origin support

## 🌐 Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/mema)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/mema)

**Or manually:** Build with `npm run build`, deploy the `dist` folder anywhere.

## 📂 Structure

```
src/
├── components/
│   ├── Chat.tsx       # Real-time chat with Socket.IO integration
│   └── Home.tsx       # Professional landing page
├── socket.ts          # Socket.IO client configuration
├── App.tsx            # Router setup
└── main.tsx           # Entry point

server/
├── index.js           # WebSocket server with Socket.IO
├── package.json       # Module configuration
└── README.md          # Backend documentation
```

## 🌐 Backend API

The backend provides real-time WebSocket communication:

- **User Management:** Join/leave events, online user tracking
- **Messaging:** Send, edit, delete messages with real-time sync
- **Interactions:** Reactions, replies, typing indicators
- **History:** Last 100 messages preserved for new users

See [server/README.md](server/README.md) for detailed API documentation.

## 🎯 Chat Features

- **Message Actions:** React, reply, edit, delete, copy
- **Rich UI:** User avatars, status indicators, smooth animations
- **Search:** Real-time message search
- **Keyboard Shortcuts:** Enter to send, Escape to cancel
- **Mobile First:** Touch-friendly responsive design

## 🤝 Contributing

1. Fork → 2. Branch → 3. Code → 4. Test → 5. PR

## 📄 License

MIT License - Build amazing things!

---

**Made with ❤️ using modern web technologies**