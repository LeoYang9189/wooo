import { useState } from 'react'
import Home from './components/home/Home'
import DraggableOctopus from './components/common/DraggableOctopus'
import AIWobaoChatbox from './components/common/AIWobaoChatbox'
import './index.css'

function App() {
  const [isAIWobaoChatboxOpen, setIsAIWobaoChatboxOpen] = useState(false)

  const handleOpenChatbox = () => {
    setIsAIWobaoChatboxOpen(true)
  }

  const handleCloseChatbox = () => {
    setIsAIWobaoChatboxOpen(false)
  }

  return (
    <>
      <Home />
      <DraggableOctopus onOpen={handleOpenChatbox} />
      <AIWobaoChatbox isOpen={isAIWobaoChatboxOpen} onClose={handleCloseChatbox} />
    </>
  )
}

export default App
