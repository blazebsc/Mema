import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const httpServer = createServer(app);

// Configure CORS for Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

app.use(cors());
app.use(express.json());

// Store active users
const users = new Map();
// Store messages for new users
const messageHistory = [];
const MAX_HISTORY = 100;

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle user join
  socket.on('user:join', (userData) => {
    const user = {
      id: socket.id,
      username: userData.username,
      isOnline: true,
      lastSeen: new Date()
    };
    
    users.set(socket.id, user);
    
    // Send message history to new user
    socket.emit('messages:history', messageHistory);
    
    // Broadcast user joined to all clients
    io.emit('user:joined', user);
    
    // Send updated user list to all clients
    io.emit('users:update', Array.from(users.values()));
    
    // Broadcast system message
    const systemMessage = {
      id: `${socket.id}-${Date.now()}`,
      username: 'System',
      message: `${userData.username} joined the chat`,
      timestamp: new Date(),
      isSystem: true,
      status: 'delivered'
    };
    
    io.emit('message:new', systemMessage);
    messageHistory.push(systemMessage);
    if (messageHistory.length > MAX_HISTORY) {
      messageHistory.shift();
    }
  });

  // Handle new message
  socket.on('message:send', (messageData) => {
    const user = users.get(socket.id);
    if (!user) return;

    const message = {
      ...messageData,
      username: user.username,
      timestamp: new Date(),
      status: 'delivered'
    };
    
    // Broadcast message to all clients
    io.emit('message:new', message);
    
    // Store in history
    messageHistory.push(message);
    if (messageHistory.length > MAX_HISTORY) {
      messageHistory.shift();
    }
  });

  // Handle message edit
  socket.on('message:edit', (data) => {
    const user = users.get(socket.id);
    if (!user) return;

    // Update in history
    const index = messageHistory.findIndex(m => m.id === data.messageId);
    if (index !== -1) {
      messageHistory[index] = {
        ...messageHistory[index],
        message: data.message,
        isEdited: true
      };
    }

    // Broadcast edit to all clients
    io.emit('message:edited', {
      messageId: data.messageId,
      message: data.message,
      isEdited: true
    });
  });

  // Handle message delete
  socket.on('message:delete', (messageId) => {
    const user = users.get(socket.id);
    if (!user) return;

    // Remove from history
    const index = messageHistory.findIndex(m => m.id === messageId);
    if (index !== -1) {
      messageHistory.splice(index, 1);
    }

    // Broadcast delete to all clients
    io.emit('message:deleted', messageId);
  });

  // Handle reaction
  socket.on('message:react', (data) => {
    const user = users.get(socket.id);
    if (!user) return;

    // Update in history
    const message = messageHistory.find(m => m.id === data.messageId);
    if (message) {
      if (!message.reactions) {
        message.reactions = {};
      }
      if (!message.reactions[data.emoji]) {
        message.reactions[data.emoji] = [];
      }
      
      const userIndex = message.reactions[data.emoji].indexOf(user.username);
      if (userIndex === -1) {
        message.reactions[data.emoji].push(user.username);
      } else {
        message.reactions[data.emoji].splice(userIndex, 1);
        if (message.reactions[data.emoji].length === 0) {
          delete message.reactions[data.emoji];
        }
      }
    }

    // Broadcast reaction to all clients
    io.emit('message:reacted', {
      messageId: data.messageId,
      emoji: data.emoji,
      username: user.username
    });
  });

  // Handle typing indicator
  socket.on('user:typing', (isTyping) => {
    const user = users.get(socket.id);
    if (!user) return;

    socket.broadcast.emit('user:typing', {
      username: user.username,
      isTyping
    });
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    if (user) {
      // Broadcast user left
      const systemMessage = {
        id: `${socket.id}-${Date.now()}`,
        username: 'System',
        message: `${user.username} left the chat`,
        timestamp: new Date(),
        isSystem: true,
        status: 'delivered'
      };
      
      io.emit('message:new', systemMessage);
      messageHistory.push(systemMessage);
      if (messageHistory.length > MAX_HISTORY) {
        messageHistory.shift();
      }

      // Remove user
      users.delete(socket.id);
      
      // Broadcast user left
      io.emit('user:left', user);
      
      // Send updated user list to all clients
      io.emit('users:update', Array.from(users.values()));
    }
    
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
