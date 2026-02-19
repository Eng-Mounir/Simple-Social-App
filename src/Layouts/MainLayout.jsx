import React from "react";
import NavBar from "../components/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";

export default function MainLayout() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-slate-100">
        <div className="container mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}

