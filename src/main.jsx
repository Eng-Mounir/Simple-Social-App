import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
import AuthContextProvider from './context/AuthContext.jsx';
import UserContextProvider from './context/UserContext.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>

  <AuthContextProvider>
    <UserContextProvider>
      <App />
      <ToastContainer />
    </UserContextProvider>
  </AuthContextProvider>
  </StrictMode>,
)
