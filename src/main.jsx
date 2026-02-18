import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
import AuthContextProvider from './context/AuthContext.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>

  <AuthContextProvider>
    <App />
    <ToastContainer />
    </AuthContextProvider>
  </StrictMode>,
)
