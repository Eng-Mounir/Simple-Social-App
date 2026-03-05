import React from 'react';
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import MainLayout from './layouts/MainLayout';  // This path should be correct
import AuthLayout from './layouts/AuthLayout';  // This path should be correct
import NewFeed from "./Pages/NewFeed/NewFeed";
import UserProfile from "./Pages/UserProfile/UserProfile";
import NotFound from './Pages/NotFound/NotFound';
import Registration from './Pages/Auth/Registration/Registration';
import Login from './Pages/Auth/Login/Login';
import AppProtectedRoute from './components/ProtectedRoutes/AppProtectedRoute';
import AuthProtectedRoute from './components/ProtectedRoutes/AuthProtectedRoute';
import SharedFeed from './Pages/SharedFeed/SharedFeed';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppProtectedRoute><MainLayout /></AppProtectedRoute>,
      children: [
        { index: true, element: <Navigate to="/home" replace /> },
        { path: "home", element: <NewFeed /> },
        { path: "profile", element: <UserProfile /> },
        { path: "shared", element: <SharedFeed /> },
        { path: "shared-feed", element: <SharedFeed /> },
      ]
    },
    {
      path: "/auth",
      element: <AuthProtectedRoute><AuthLayout /></AuthProtectedRoute>,
      children: [
        { index: true, element: <Navigate to="/auth/login" replace /> },
        { path: "registration", element: <Registration /> },
        { path: "login", element: <Login /> }
      ]
    },
    {
      path: "*",
      element: <NotFound />
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;