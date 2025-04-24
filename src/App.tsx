import { useState, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DraggableOctopus from './components/common/DraggableOctopus'
import AIWobaoChatbox from './components/common/AIWobaoChatbox'
import LoadingSpinner from './components/common/LoadingSpinner'
import CookieConsent from './components/common/CookieConsent'
import LeadFormModal from './components/common/LeadFormModal'
import { ModalProvider, useModal } from './contexts/ModalContext'
import './index.css'

// AppContent组件
import AppContent from './components/AppContent'

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
      <ModalProvider>
        <AppContent
          isAIWobaoChatboxOpen={isAIWobaoChatboxOpen}
          handleOpenChatbox={handleOpenChatbox}
          handleCloseChatbox={handleCloseChatbox}
        />
      </ModalProvider>
    </Router>
  )
}

export default App
