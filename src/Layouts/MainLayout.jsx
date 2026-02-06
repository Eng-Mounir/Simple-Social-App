import React from 'react'
import NavBar from '../componenets/NavBar/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from '../componenets/Footer/Footer'

export default function MainLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  )
}
