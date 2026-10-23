import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HubSpotPage from './components/HubSpotPage'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HubSpotPage />
  </StrictMode>,
)
