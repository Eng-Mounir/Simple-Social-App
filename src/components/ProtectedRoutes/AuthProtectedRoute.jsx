//ha7oot file dh logic el token w el auth w el protected routes
import React from 'react'
import { Navigate,useNavigate } from "react-router-dom";
import { useState , useEffect } from "react";
import { use } from 'react';
export default function AuthProtectedRoute({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const Navigate = useNavigate(); // Use useNavigate from react-router-dom
  useEffect(() => {
    if (token) {
        Navigate("/home", { replace: true });
    }
  }, []);
  return (
    <>
      {children}
    </>
  )
}
