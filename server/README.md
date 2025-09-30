# Mema Chat Backend

WebSocket server for real-time chat functionality using Socket.IO.

## Features

- ✅ Real-time message broadcasting
- ✅ User join/leave events
- ✅ Typing indicators
- ✅ Message editing and deletion
- ✅ Message reactions
- ✅ Online user tracking
- ✅ Message history (last 100 messages)
- ✅ CORS configuration for frontend

## Technology Stack

- **Express.js** - Web server framework
- **Socket.IO** - WebSocket library for real-time communication
- **Node.js** - Runtime environment

## Installation

```bash
cd /home/runner/work/Mema/Mema
npm install
```

## Running the Server

### Development Mode

```bash
# Run backend only
npm run dev:backend

# Run both frontend and backend concurrently
npm run dev:all
```

### Production Mode

```bash
npm run server
```

## Environment Variables

The server supports the following environment variables:

- `PORT` - Server port (default: 3001)
- `CLIENT_URL` - Frontend URL for CORS (default: http://localhost:5173)

## API Events

### Client → Server

- `user:join` - User joins the chat
  ```js
  socket.emit('user:join', { username: 'John' })
  ```

- `message:send` - Send a new message
  ```js
  socket.emit('message:send', {
    id: 'unique-id',
    message: 'Hello!',
    timestamp: new Date(),
    replyTo: 'message-id', // optional
    reactions: {}
  })
  ```

- `message:edit` - Edit an existing message
  ```js
  socket.emit('message:edit', {
    messageId: 'message-id',
    message: 'Updated text'
  })
  ```

- `message:delete` - Delete a message
  ```js
  socket.emit('message:delete', 'message-id')
  ```

- `message:react` - Add/remove reaction to a message
  ```js
  socket.emit('message:react', {
    messageId: 'message-id',
    emoji: '👍'
  })
  ```

- `user:typing` - Update typing status
  ```js
  socket.emit('user:typing', true)
  ```

### Server → Client

- `messages:history` - Receive message history on join
- `message:new` - New message broadcast
- `message:edited` - Message edited notification
- `message:deleted` - Message deleted notification
- `message:reacted` - Message reaction updated
- `users:update` - Online users list updated
- `user:joined` - User joined notification
- `user:left` - User left notification
- `user:typing` - Typing indicator update

## Server Architecture

```
server/
├── index.js       # Main server file
└── package.json   # Module configuration
```

## Message Storage

- Messages are stored in-memory
- Last 100 messages are kept in history
- New users receive full message history on join
- Messages are lost on server restart

## Future Enhancements

- [ ] Database integration for persistent storage
- [ ] User authentication
- [ ] Private messaging
- [ ] File uploads
- [ ] Message search
- [ ] Read receipts
- [ ] User presence (away, busy, etc.)
