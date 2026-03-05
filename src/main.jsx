import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
import AuthContextProvider from './context/AuthContext.jsx';
import UserContextProvider from './context/UserContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
createRoot(document.getElementById('root')).render(
  <ThemeProvider>
  <StrictMode>
<UserContextProvider>
  <AuthContextProvider>
    
      <App />
      <ToastContainer />
    </AuthContextProvider>
</UserContextProvider>
  </StrictMode>
   </ThemeProvider>
)
