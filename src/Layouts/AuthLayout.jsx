import React from "react";
import { Outlet } from "react-router-dom";
import AuthBg from "../assets/images/ChatGptImge2.png";

export default function AuthLayout() {
  return (
    <main className="grid grid-cols-5 min-h-screen">

      <div className="col-span-3  max-w-5xl w-full">
        <img src={AuthBg} alt="Nextify Background" className="w-full h-full object-cover"/>
      </div>

      <div className="col-span-2 flex items-center justify-center">
        <Outlet />
      </div>
    </main>
  );
}
