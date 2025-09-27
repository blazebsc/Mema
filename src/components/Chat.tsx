import { useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface Message {
  id: string
  username: string
  message: string
  timestamp: Date
  isSystem?: boolean
}

interface User {
  id: string
  username: string
  isOnline: boolean
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [currentMessage, setCurrentMessage] = useState('')
  const [username, setUsername] = useState('')
  const [isJoined, setIsJoined] = useState(false)
  const [isTyping, setIsTyping] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Simulate real-time features with local state
  const joinChat = () => {
    if (!username.trim()) return
    
    const newUser: User = {
      id: uuidv4(),
      username: username.trim(),
      isOnline: true
    }
    
    setUsers(prev => [...prev, newUser])
    setIsJoined(true)
    
    // Add system message
    const systemMessage: Message = {
      id: uuidv4(),
      username: 'System',
      message: `${username.trim()} joined the chat`,
      timestamp: new Date(),
      isSystem: true
    }
    setMessages(prev => [...prev, systemMessage])
  }

  const leaveChat = () => {
    const systemMessage: Message = {
      id: uuidv4(),
      username: 'System',
      message: `${username} left the chat`,
      timestamp: new Date(),
      isSystem: true
    }
    setMessages(prev => [...prev, systemMessage])
    setUsers(prev => prev.filter(user => user.username !== username))
    setIsJoined(false)
    setUsername('')
  }

  const sendMessage = () => {
    if (!currentMessage.trim() || !isJoined) return

    const newMessage: Message = {
      id: uuidv4(),
      username,
      message: currentMessage.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newMessage])
    setCurrentMessage('')
    
    // Remove typing indicator
    setIsTyping(prev => prev.filter(user => user !== username))
  }

  const handleTyping = (value: string) => {
    setCurrentMessage(value)
    
    // Add typing indicator
    if (value.trim() && !isTyping.includes(username)) {
      setIsTyping(prev => [...prev, username])
    }
    
    // Clear typing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    
    // Set timeout to remove typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(prev => prev.filter(user => user !== username))
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  // Join screen
  if (!isJoined) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Join Chat
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Enter your username to start chatting
            </p>
          </div>
          
          <div className="space-y-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && joinChat()}
              placeholder="Enter your username"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white placeholder-gray-400"
              maxLength={20}
            />
            <button
              onClick={joinChat}
              disabled={!username.trim()}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
            >
              Join Chat
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Chat interface
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              Mema Chat
            </h1>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {users.length} online
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Welcome, <strong>{username}</strong>
            </span>
            <button
              onClick={leaveChat}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors duration-200"
            >
              Leave
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 max-w-6xl mx-auto w-full">
        {/* Sidebar - Online Users */}
        <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
          <h2 className="font-semibold text-gray-800 dark:text-white mb-4">
            Online Users ({users.length})
          </h2>
          <div className="space-y-2">
            {users.map((user) => (
              <div key={user.id} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {user.username}
                  {user.username === username && ' (You)'}
                </span>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900 chat-scroll">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex fade-in ${msg.isSystem ? 'justify-center' : msg.username === username ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.isSystem ? (
                    <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full">
                      {msg.message}
                    </div>
                  ) : (
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl message-bubble ${
                      msg.username === username ? 'own' : ''
                    } ${
                      msg.username === username
                        ? 'bg-blue-500 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700'
                    }`}>
                      {msg.username !== username && (
                        <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                          {msg.username}
                        </div>
                      )}
                      <div className="break-words chat-message">{msg.message}</div>
                      <div className={`text-xs mt-1 ${
                        msg.username === username ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {formatTime(msg.timestamp)}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Typing Indicators */}
              {isTyping.filter(user => user !== username).length > 0 && (
                <div className="flex justify-start fade-in">
                  <div className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-2xl">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {isTyping.filter(user => user !== username).join(', ')} {
                        isTyping.filter(user => user !== username).length === 1 ? 'is' : 'are'
                      } typing...
                    </div>
                    <div className="flex space-x-1 mt-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Message Input */}
          <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => handleTyping(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white placeholder-gray-400"
                maxLength={500}
              />
              <button
                onClick={sendMessage}
                disabled={!currentMessage.trim()}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors duration-200 font-semibold"
              >
                Send
              </button>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Press Enter to send • {currentMessage.length}/500
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}