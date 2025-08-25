import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'
import BodyText from './Body'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BodyText />
  </StrictMode>,
)
