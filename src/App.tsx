import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Chat from './components/Chat'
import './App.css'

function App() {
  // Use basename only in production (GitHub Pages)
  const basename = import.meta.env.MODE === 'production' ? '/Mema' : '';
  
  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  )
}

export default App
