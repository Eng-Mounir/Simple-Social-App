import React from 'react'
import { use } from 'react';
import { createContext } from 'react';
import { useState } from 'react';  
export const AuthContext = createContext();
export default function AuthContextProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };
  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
        {children}
    </AuthContext.Provider>
  )
}
