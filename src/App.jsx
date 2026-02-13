import React from 'react';
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner"; // Changed to Spinner - more common
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout'; 
import NewFeed from "./Pages/NewFeed/NewFeed";
import UserProfile from "./Pages/UserProfile/UserProfile";
import NotFound from './Pages/NotFound/NotFound';
import Registration from './Pages/Auth/Registration/Registration';
import Login from './Pages/Auth/Login/Login';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <Navigate to="/home" replace /> },
        { path: "home", element: <NewFeed /> },
        { path: "profile", element: <UserProfile /> },
      ]
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        { index: true, element: <Navigate to="/auth/login" replace /> },
        { path: "registration", element: <Registration /> },
        { path: "login", element: <Login /> }
      ]
    },
    // Catch-all route should be at root level
    {
      path: "*",
      element: <NotFound />
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">

      
      {/* Router Provider should typically be at the root */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;