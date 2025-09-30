# Quick Start Guide - Mema Chat

## Installation

```bash
# Clone the repository
git clone https://github.com/blazebsc/Mema.git
cd Mema

# Install dependencies
npm install
```

## Running the Application

### Option 1: Run Everything (Recommended)

Run both frontend and backend simultaneously:

```bash
npm run dev:all
```

This will start:
- Frontend dev server on http://localhost:5173
- Backend WebSocket server on http://localhost:3001

### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
npm run dev:backend
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

## Testing the Chat

1. Open http://localhost:5173 in your browser
2. Click "Launch App" or navigate to http://localhost:5173/chat
3. Enter a username and click "Join Chat"
4. Open another browser tab/window and repeat steps 2-3 with a different username
5. Send messages between the two users to see real-time chat in action!

## Features to Try

- **Send Messages**: Type and press Enter
- **Multi-user Chat**: Open multiple tabs with different usernames
- **System Messages**: Watch join/leave notifications
- **Online Users**: See who's currently in the chat
- **Typing Indicators**: Start typing to show others you're typing
- **Message Reactions**: Hover over messages and click the smile icon (frontend feature)
- **Message Editing**: Hover and click edit icon (frontend feature)
- **Dark Mode**: Toggle the theme switch

## Production Build

```bash
# Build the frontend
npm run build

# Run the backend server
npm run server

# Serve the built frontend (in a separate terminal)
npm run serve
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_SOCKET_URL=http://localhost:3001
```

For production, update the URL to your deployed backend server.

## Troubleshooting

**Backend not connecting?**
- Make sure the backend server is running on port 3001
- Check the browser console for WebSocket connection errors
- Verify CORS settings in `server/index.js`

**Messages not syncing?**
- Refresh the page to reconnect to the WebSocket server
- Check that both users are connected to the same backend server

**Port already in use?**
- Change the port in `server/index.js` (default: 3001)
- Update `VITE_SOCKET_URL` in your `.env.local` file

## Next Steps

- Read [server/README.md](server/README.md) for backend API documentation
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment guides
- See [CHAT_IMPROVEMENTS.md](CHAT_IMPROVEMENTS.md) for feature details

## Support

- 🐛 Report issues on GitHub
- 📖 Read the documentation
- ⭐ Star the repo if you like it!
