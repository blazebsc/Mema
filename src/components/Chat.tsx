import { useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { 
  Send, 
  Smile, 
  Paperclip, 
  Search, 
  Settings, 
  Phone, 
  Video, 
  MoreVertical,
  Edit,
  Trash2,
  Reply,
  Copy,
  User,
  Clock,
  Check,
  CheckCheck,
  MessageCircle
} from 'lucide-react'

interface Message {
  id: string
  username: string
  message: string
  timestamp: Date
  isSystem?: boolean
  isEdited?: boolean
  replyTo?: string
  reactions?: { [emoji: string]: string[] }
  status?: 'sending' | 'sent' | 'delivered' | 'read'
}

interface User {
  id: string
  username: string
  isOnline: boolean
  avatar?: string
  lastSeen?: Date
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [currentMessage, setCurrentMessage] = useState('')
  const [username, setUsername] = useState('')
  const [isJoined, setIsJoined] = useState(false)
  const [isTyping, setIsTyping] = useState<string[]>([])
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null)
  const [editingMessage, setEditingMessage] = useState<string | null>(null)
  const [replyingTo, setReplyingTo] = useState<Message | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [darkMode, setDarkMode] = useState(() => 
    localStorage.getItem('darkMode') === 'true' || window.matchMedia('(prefers-color-scheme: dark)').matches
  )
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const messageInputRef = useRef<HTMLInputElement>(null)

  // Common emojis for quick access
  const commonEmojis = ['😀', '😂', '❤️', '👍', '👎', '😍', '🔥', '⭐', '🎉', '💯']

  // Generate user avatar color based on username
  const getUserAvatarColor = (username: string) => {
    const colors = [
      'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500',
      'bg-pink-500', 'bg-indigo-500', 'bg-gray-500', 'bg-orange-500', 'bg-teal-500'
    ]
    const hash = username.split('').reduce((a, b) => a + b.charCodeAt(0), 0)
    return colors[hash % colors.length]
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString())
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  // Filter messages based on search query
  const filteredMessages = searchQuery
    ? messages.filter(msg => 
        msg.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : messages

  // Simulate real-time features with local state
  const joinChat = () => {
    if (!username.trim()) return
    
    const newUser: User = {
      id: uuidv4(),
      username: username.trim(),
      isOnline: true,
      lastSeen: new Date()
    }
    
    setUsers(prev => [...prev, newUser])
    setIsJoined(true)
    
    // Add system message
    const systemMessage: Message = {
      id: uuidv4(),
      username: 'System',
      message: `${username.trim()} joined the chat`,
      timestamp: new Date(),
      isSystem: true,
      status: 'delivered'
    }
    setMessages(prev => [...prev, systemMessage])
  }

  const leaveChat = () => {
    const systemMessage: Message = {
      id: uuidv4(),
      username: 'System',
      message: `${username} left the chat`,
      timestamp: new Date(),
      isSystem: true,
      status: 'delivered'
    }
    setMessages(prev => [...prev, systemMessage])
    setUsers(prev => prev.filter(user => user.username !== username))
    setIsJoined(false)
    setUsername('')
    setReplyingTo(null)
    setEditingMessage(null)
  }

  const sendMessage = () => {
    if (!currentMessage.trim() || !isJoined) return

    const newMessage: Message = {
      id: uuidv4(),
      username,
      message: currentMessage.trim(),
      timestamp: new Date(),
      replyTo: replyingTo?.id,
      status: 'sending',
      reactions: {}
    }

    setMessages(prev => [...prev, newMessage])
    setCurrentMessage('')
    setReplyingTo(null)
    
    // Simulate message delivery status
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === newMessage.id ? { ...msg, status: 'sent' } : msg
      ))
    }, 100)
    
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
      ))
    }, 500)
    
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
      if (editingMessage) {
        saveEditedMessage()
      } else {
        sendMessage()
      }
    } else if (e.key === 'Escape') {
      setEditingMessage(null)
      setReplyingTo(null)
      setCurrentMessage('')
    }
  }

  const addReaction = (messageId: string, emoji: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const reactions = { ...msg.reactions } || {}
        if (!reactions[emoji]) {
          reactions[emoji] = []
        }
        
        if (reactions[emoji].includes(username)) {
          reactions[emoji] = reactions[emoji].filter(user => user !== username)
          if (reactions[emoji].length === 0) {
            delete reactions[emoji]
          }
        } else {
          reactions[emoji].push(username)
        }
        
        return { ...msg, reactions }
      }
      return msg
    }))
  }

  const deleteMessage = (messageId: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId))
    setSelectedMessage(null)
  }

  const startEditMessage = (messageId: string, currentText: string) => {
    setEditingMessage(messageId)
    setCurrentMessage(currentText)
    setSelectedMessage(null)
    messageInputRef.current?.focus()
  }

  const saveEditedMessage = () => {
    if (!editingMessage || !currentMessage.trim()) return
    
    setMessages(prev => prev.map(msg =>
      msg.id === editingMessage
        ? { ...msg, message: currentMessage.trim(), isEdited: true }
        : msg
    ))
    setEditingMessage(null)
    setCurrentMessage('')
  }

  const copyMessage = (message: string) => {
    navigator.clipboard.writeText(message)
    setSelectedMessage(null)
  }

  const addEmoji = (emoji: string) => {
    setCurrentMessage(prev => prev + emoji)
    setShowEmojiPicker(false)
    messageInputRef.current?.focus()
  }

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const getMessageStatusIcon = (status?: string) => {
    switch (status) {
      case 'sending':
        return <Clock className="w-3 h-3 opacity-50" />
      case 'sent':
        return <Check className="w-3 h-3 opacity-50" />
      case 'delivered':
        return <CheckCheck className="w-3 h-3 opacity-50" />
      case 'read':
        return <CheckCheck className="w-3 h-3 text-blue-400" />
      default:
        return null
    }
  }

  const findReplyMessage = (replyId?: string) => {
    return messages.find(msg => msg.id === replyId)
  }

  // Join screen
  if (!isJoined) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 ${darkMode ? 'dark' : ''}`}>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-md relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Welcome to Mema Chat
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Enter your username and start connecting with others
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && joinChat()}
                placeholder="Enter your username"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white placeholder-gray-400 transition-all duration-200"
                maxLength={20}
                autoFocus
              />
            </div>
            <button
              onClick={joinChat}
              disabled={!username.trim()}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-xl"
            >
              Join Chat
            </button>
          </div>
          
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
            <span className="text-sm text-gray-500 dark:text-gray-400">Theme</span>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Chat interface
  return (
    <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col ${darkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 p-4 relative">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              Mema Chat
            </h1>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {users.length} online
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Search Toggle */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
              title="Search messages"
            >
              <Search className="w-5 h-5" />
            </button>
            
            {/* Video Call Button */}
            <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200" title="Video call">
              <Video className="w-5 h-5" />
            </button>
            
            {/* Voice Call Button */}
            <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200" title="Voice call">
              <Phone className="w-5 h-5" />
            </button>
            
            {/* Settings */}
            <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200" title="Settings">
              <Settings className="w-5 h-5" />
            </button>
            
            <div className="flex items-center space-x-2">
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
        </div>
        
        {/* Search Bar */}
        {showSearch && (
          <div className="max-w-6xl mx-auto mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white placeholder-gray-400"
              />
            </div>
          </div>
        )}
      </header>

      <div className="flex flex-1 max-w-6xl mx-auto w-full">
        {/* Sidebar - Online Users */}
        <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 hidden md:block">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800 dark:text-white">
              Online Users
            </h2>
            <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">
              {users.length}
            </span>
          </div>
          <div className="space-y-3">
            {users.map((user) => (
              <div key={user.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <div className="relative">
                  <div className={`w-8 h-8 ${getUserAvatarColor(user.username)} rounded-full flex items-center justify-center text-white font-semibold text-sm`}>
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                    {user.username}
                    {user.username === username && (
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">(You)</span>
                    )}
                  </div>
                  <div className="text-xs text-green-600 dark:text-green-400">
                    Active now
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900 chat-scroll relative">
            <div className="space-y-4">
              {filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex fade-in ${msg.isSystem ? 'justify-center' : msg.username === username ? 'justify-end' : 'justify-start'} group`}
                >
                  {msg.isSystem ? (
                    <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full">
                      {msg.message}
                    </div>
                  ) : (
                    <div className={`max-w-xs lg:max-w-md relative message-bubble ${
                      msg.username === username ? 'own' : ''
                    }`}>
                      {/* Reply context */}
                      {msg.replyTo && (
                        <div className="mb-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg border-l-4 border-blue-500">
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            Replying to {findReplyMessage(msg.replyTo)?.username}
                          </div>
                          <div className="text-sm text-gray-700 dark:text-gray-300 truncate">
                            {findReplyMessage(msg.replyTo)?.message}
                          </div>
                        </div>
                      )}

                      <div
                        className={`px-4 py-2 rounded-2xl relative ${
                          msg.username === username
                            ? 'bg-blue-500 text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700'
                        }`}
                        onMouseEnter={() => setSelectedMessage(msg.id)}
                        onMouseLeave={() => setSelectedMessage(null)}
                      >
                        {/* Username for others' messages */}
                        {msg.username !== username && (
                          <div className="flex items-center space-x-2 mb-1">
                            <div className={`w-4 h-4 ${getUserAvatarColor(msg.username)} rounded-full flex items-center justify-center text-white text-xs font-bold`}>
                              {msg.username.charAt(0).toUpperCase()}
                            </div>
                            <div className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                              {msg.username}
                            </div>
                          </div>
                        )}

                        {/* Message content */}
                        <div className="break-words chat-message">
                          {msg.message}
                          {msg.isEdited && (
                            <span className={`text-xs ml-2 ${
                              msg.username === username ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                            }`}>
                              (edited)
                            </span>
                          )}
                        </div>

                        {/* Timestamp and status */}
                        <div className={`flex items-center justify-between mt-1 ${
                          msg.username === username ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          <div className="text-xs">
                            {formatTime(msg.timestamp)}
                          </div>
                          {msg.username === username && (
                            <div className="flex items-center space-x-1">
                              {getMessageStatusIcon(msg.status)}
                            </div>
                          )}
                        </div>

                        {/* Reactions */}
                        {msg.reactions && Object.keys(msg.reactions).length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {Object.entries(msg.reactions).map(([emoji, users]) => (
                              <button
                                key={emoji}
                                onClick={() => addReaction(msg.id, emoji)}
                                className={`text-xs px-2 py-1 rounded-full border transition-all duration-200 hover:scale-105 ${
                                  users.includes(username)
                                    ? 'bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700'
                                    : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600'
                                }`}
                                title={`${users.join(', ')} reacted with ${emoji}`}
                              >
                                {emoji} {users.length}
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Message actions */}
                        {selectedMessage === msg.id && !msg.isSystem && (
                          <div className={`absolute flex items-center space-x-1 z-10 ${
                            msg.username === username ? '-left-20' : '-right-20'
                          } top-0 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-1 shadow-lg`}>
                            <button
                              onClick={() => setReplyingTo(msg)}
                              className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors duration-200"
                              title="Reply"
                            >
                              <Reply className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => copyMessage(msg.message)}
                              className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors duration-200"
                              title="Copy"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                              className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors duration-200"
                              title="Add reaction"
                            >
                              <Smile className="w-3 h-3" />
                            </button>
                            {msg.username === username && (
                              <>
                                <button
                                  onClick={() => startEditMessage(msg.id, msg.message)}
                                  className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors duration-200"
                                  title="Edit"
                                >
                                  <Edit className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => deleteMessage(msg.id)}
                                  className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900 rounded transition-colors duration-200"
                                  title="Delete"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </>
                            )}
                          </div>
                        )}
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

            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div className="absolute bottom-20 right-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3 z-50">
                <div className="grid grid-cols-5 gap-2">
                  {commonEmojis.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => addEmoji(emoji)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors duration-200 text-xl"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
            {/* Reply preview */}
            {replyingTo && (
              <div className="mb-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Replying to {replyingTo.username}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {replyingTo.message}
                    </div>
                  </div>
                  <button
                    onClick={() => setReplyingTo(null)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}

            {/* Edit mode indicator */}
            {editingMessage && (
              <div className="mb-3 p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg border-l-4 border-yellow-500">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                    Editing message
                  </div>
                  <button
                    onClick={() => {
                      setEditingMessage(null)
                      setCurrentMessage('')
                    }}
                    className="text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-200"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-end space-x-2">
              {/* Attachment button */}
              <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 mb-1">
                <Paperclip className="w-5 h-5" />
              </button>
              
              {/* Message input */}
              <div className="flex-1 relative">
                <input
                  ref={messageInputRef}
                  type="text"
                  value={currentMessage}
                  onChange={(e) => handleTyping(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={editingMessage ? "Edit your message..." : "Type your message..."}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white placeholder-gray-400 resize-none"
                  maxLength={500}
                  disabled={!isJoined}
                />
                
                {/* Emoji button */}
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
                >
                  <Smile className="w-5 h-5" />
                </button>
              </div>
              
              {/* Send button */}
              <button
                onClick={editingMessage ? saveEditedMessage : sendMessage}
                disabled={!currentMessage.trim() || !isJoined}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all duration-200 font-semibold hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-xl"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
              <div>
                {editingMessage ? 'Press Enter to save • ESC to cancel' : 'Press Enter to send • Shift+Enter for new line'}
              </div>
              <div className={`${currentMessage.length > 450 ? 'text-red-500' : ''}`}>
                {currentMessage.length}/500
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}