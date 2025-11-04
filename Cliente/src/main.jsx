import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HolaProvider } from './context/HolaContext'
import './index.css'
import App from './app'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <HolaProvider>
        <App />
    </HolaProvider>
    </BrowserRouter>
  </StrictMode>,
)
