import { useState } from 'react'
import { Link } from 'react-router-dom'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'

export default function Home() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <div className="flex justify-center space-x-8 mb-8">
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo hover:drop-shadow-lg transition-all" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react hover:drop-shadow-lg transition-all" alt="React logo" />
          </a>
        </div>
        
        <h1 className="text-6xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Mema
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl">
          A modern real-time chat application built with Vite + React + TypeScript + Tailwind CSS
        </p>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl mb-8 max-w-md mx-auto">
          <button 
            onClick={() => setCount((count) => count + 1)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 mb-4 transform hover:scale-105"
          >
            count is {count}
          </button>
          <p className="text-gray-600 dark:text-gray-300">
            Edit <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">src/App.tsx</code> and save to test HMR
          </p>
        </div>

        <div className="space-y-4">
          <Link 
            to="/chat" 
            className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Enter Chat Room
          </Link>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Join the conversation with other users in real-time
          </div>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-12">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </div>
  )
}