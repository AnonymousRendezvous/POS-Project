import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'
import NavBar from "./navbar.tsx"
import CheckOut from "./checkout.tsx"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NavBar />
    <CheckOut />
  </StrictMode>,
)
//react components
