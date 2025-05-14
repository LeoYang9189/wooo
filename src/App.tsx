import { BrowserRouter as Router } from 'react-router-dom'
import { ModalProvider } from './contexts/ModalContext'
import './index.css'

// AppContent组件
import AppContent from './components/AppContent'

function App() {
  return (
    <Router>
      <ModalProvider>
        <AppContent />
      </ModalProvider>
    </Router>
  )
}

export default App
