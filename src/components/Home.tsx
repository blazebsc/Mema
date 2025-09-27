import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  MessageCircle, 
  Users, 
  Zap, 
  Shield, 
  Smartphone, 
  ArrowRight,
  Github,
  Twitter,
  Mail,
  CheckCircle,
  Play,
  Palette
} from 'lucide-react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'

const features = [
  {
    icon: MessageCircle,
    title: 'Real-time Messaging',
    description: 'Send and receive messages instantly with our lightning-fast real-time chat system.'
  },
  {
    icon: Users,
    title: 'Multi-user Support',
    description: 'Connect with multiple users simultaneously and see who\'s online in real-time.'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Built with modern technologies for optimal performance and instant responsiveness.'
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your conversations are protected with industry-standard security measures.'
  },
  {
    icon: Smartphone,
    title: 'Mobile Responsive',
    description: 'Perfect experience across all devices - desktop, tablet, and mobile.'
  },
  {
    icon: Palette,
    title: 'Modern Design',
    description: 'Beautiful, intuitive interface with dark mode support and smooth animations.'
  }
]

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Product Manager',
    avatar: '👩‍💼',
    content: 'Mema has revolutionized how our team communicates. The real-time features are incredible!'
  },
  {
    name: 'David Rodriguez',
    role: 'Software Engineer',
    avatar: '👨‍💻',
    content: 'Clean, fast, and reliable. Everything I look for in a chat application. Love the dark mode!'
  },
  {
    name: 'Emily Johnson',
    role: 'Designer',
    avatar: '👩‍🎨',
    content: 'The UI is stunning and the user experience is seamless. Best chat app I\'ve used!'
  }
]

const stats = [
  { number: '10K+', label: 'Active Users' },
  { number: '1M+', label: 'Messages Sent' },
  { number: '99.9%', label: 'Uptime' },
  { number: '< 100ms', label: 'Response Time' }
]

export default function Home() {
  const [count, setCount] = useState(0)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Mema
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('features')}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Testimonials
              </button>
              <Link 
                to="/chat" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Launch App
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={`pt-24 pb-20 px-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center space-x-8 mb-12">
            <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
              <img src={viteLogo} className="logo hover:drop-shadow-lg transition-all" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
              <img src={reactLogo} className="logo react hover:drop-shadow-lg transition-all" alt="React logo" />
            </a>
          </div>
          
          <h1 className="text-7xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Mema
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            The next generation of real-time communication
          </p>
          
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Built with cutting-edge technologies: React, TypeScript, Tailwind CSS, and Vite for 
            lightning-fast performance and modern user experience.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link 
              to="/chat" 
              className="group inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Start Chatting
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <button className="group inline-flex items-center bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-2 border-gray-200 dark:border-gray-700 font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </button>
          </div>

          {/* Interactive Demo */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl mb-16 max-w-md mx-auto border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Try the Interactive Demo</h3>
            <button 
              onClick={() => setCount((count) => count + 1)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 mb-4 transform hover:scale-105 shadow-lg"
            >
              Clicks: {count}
            </button>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Experience our lightning-fast reactivity with hot module replacement (HMR)
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need for seamless communication in one beautiful package
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group hover:scale-105"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
                Built for the Modern Web
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Mema represents the cutting edge of web technology. Built with React 19, TypeScript, 
                and Tailwind CSS, it delivers unparalleled performance and user experience.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  'Lightning-fast Vite development environment',
                  'Type-safe development with TypeScript',
                  'Beautiful UI with Tailwind CSS',
                  'Real-time communication capabilities',
                  'Responsive design for all devices',
                  'Dark mode support'
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
              
              <Link 
                to="/chat" 
                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                Experience Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  Tech Stack
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Powered by the latest technologies
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'React 19', desc: 'Latest React features' },
                  { name: 'TypeScript', desc: 'Type safety' },
                  { name: 'Tailwind CSS', desc: 'Utility-first CSS' },
                  { name: 'Vite', desc: 'Super fast builds' }
                ].map((tech, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
                    <div className="font-semibold text-gray-800 dark:text-white">
                      {tech.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {tech.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-16">
            What People Are Saying
          </h2>
          
          <div className="relative">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
              <div className="text-6xl mb-4">
                {testimonials[currentTestimonial].avatar}
              </div>
              <blockquote className="text-xl text-gray-700 dark:text-gray-300 mb-6 italic">
                "{testimonials[currentTestimonial].content}"
              </blockquote>
              <div>
                <div className="font-bold text-gray-800 dark:text-white">
                  {testimonials[currentTestimonial].name}
                </div>
                <div className="text-gray-500 dark:text-gray-400">
                  {testimonials[currentTestimonial].role}
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial 
                      ? 'bg-blue-600' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already enjoying seamless real-time communication
          </p>
          <Link 
            to="/chat" 
            className="inline-flex items-center bg-white text-blue-600 font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <MessageCircle className="w-6 h-6 mr-2" />
            Launch Mema Chat
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Mema</span>
              </div>
              <p className="text-gray-400 mb-4">
                The future of real-time communication, built with modern web technologies.
              </p>
              <div className="flex space-x-4">
                <Github className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Mail className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">Features</li>
                <li className="hover:text-white cursor-pointer transition-colors">Pricing</li>
                <li className="hover:text-white cursor-pointer transition-colors">Documentation</li>
                <li className="hover:text-white cursor-pointer transition-colors">API</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">About</li>
                <li className="hover:text-white cursor-pointer transition-colors">Blog</li>
                <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
                <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">Help Center</li>
                <li className="hover:text-white cursor-pointer transition-colors">Community</li>
                <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
                <li className="hover:text-white cursor-pointer transition-colors">Terms of Service</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Mema. Built with ❤️ using React, TypeScript, and Tailwind CSS.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}