//ha7oot file dh logic el token w el auth w el protected routes
import React from 'react'
import { Navigate,useNavigate } from "react-router-dom";
import { useState , useEffect } from "react";
import { use } from 'react';
import { useContext } from "react"; 
import { AuthContext } from "../../context/AuthContext";
export default function AuthProtectedRoute({ children }) {
  const { token } = useContext(AuthContext);
  const Navigate = useNavigate(); // Use useNavigate from react-router-dom
  useEffect(() => {
    if (token) {
        Navigate("/home", { replace: true });
    }
  }, [token]);
  return (
    <>
      {children}
    </>
  )
}
