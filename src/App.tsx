import { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ModalProvider } from './contexts/ModalContext'
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
