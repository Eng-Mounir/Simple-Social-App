import React from "react";
import { Outlet } from "react-router-dom";
import AuthBg from "../assets/images/nextify-auth-bg.svg";

export default function AuthLayout() {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-4 min-h-screen">
      {/* Image - Hidden on mobile, visible on large screens */}
      <div className="hidden lg:block lg:col-span-2 max-w-5xl w-full">
        <img src={AuthBg} alt="Nextify Background" className="w-full h-full object-cover"/>
      </div>

      {/* Form - Full width on mobile, half width on large screens */}
      <div className="col-span-1 lg:col-span-2 flex items-center justify-center">
        <Outlet />
      </div>
    </main>
  );
}