import { useState, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DraggableOctopus from './components/common/DraggableOctopus'
import AIWobaoChatbox from './components/common/AIWobaoChatbox'
import LoadingSpinner from './components/common/LoadingSpinner'
import CookieConsent from './components/common/CookieConsent'
import './index.css'

// 使用懒加载优化性能
const Home = lazy(() => import('./components/home/Home'))
const Auth = lazy(() => import('./components/pages/Auth'))
const Terms = lazy(() => import('./components/pages/Terms'))
const Privacy = lazy(() => import('./components/pages/Privacy'))
const CookieSettings = lazy(() => import('./components/pages/CookieSettings'))
const NotFound = lazy(() => import('./components/pages/NotFound'))

function App() {
  const [isAIWobaoChatboxOpen, setIsAIWobaoChatboxOpen] = useState(false)

  const handleOpenChatbox = () => {
    setIsAIWobaoChatboxOpen(true)
  }

  const handleCloseChatbox = () => {
    setIsAIWobaoChatboxOpen(false)
  }

  return (
    <Router>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner size="lg" color="primary" />
        </div>
      }>
        <CookieConsent />
        <Routes>
          <Route path="/" element={
            <>
              <Home />
              <DraggableOctopus onOpen={handleOpenChatbox} />
              <AIWobaoChatbox isOpen={isAIWobaoChatboxOpen} onClose={handleCloseChatbox} />
            </>
          } />
          <Route path="/auth" element={<Auth />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/cookie-settings" element={<CookieSettings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
