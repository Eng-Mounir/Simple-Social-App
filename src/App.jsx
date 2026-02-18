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
import AppProtectedRoute from './components/ProtectedRoutes/AppProtectedRoute';
import AuthProtectedRoute from './components/ProtectedRoutes/AuthProtectedRoute';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppProtectedRoute><MainLayout /></AppProtectedRoute>  , // Wrap MainLayout with AppProtectedRoute
      // element: <MainLayout />,
      children: [
        { index: true, element: <Navigate to="/home" replace /> },
        { path: "home", element: <NewFeed /> },
        { path: "profile", element: <UserProfile /> },
      ]
    },
    {
      path: "/auth",
      element: <AuthProtectedRoute><AuthLayout /></AuthProtectedRoute>, // Wrap AuthLayout with AuthProtectedRoute
      //element: <AuthLayout />,
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


// import React from 'react';
// import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
// import MainLayout from './layouts/MainLayout';
// // import AuthLayout from './layouts/AuthLayout'; 
// import NewFeed from "./Pages/NewFeed/NewFeed";
// import UserProfile from "./Pages/UserProfile/UserProfile";
// import NotFound from './Pages/NotFound/NotFound';
// // import Registration from './Pages/Auth/Registration/Registration';
// // import Login from './Pages/Auth/Login/Login';
// // import AppProtectedRoute from './components/ProtectedRoutes/AppProtectedRoute';
// // import AuthProtectedRoute from './components/ProtectedRoutes/AuthProtectedRoute';

// function App() {
//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <MainLayout />, // no protection for now
//       children: [
//         { index: true, element: <Navigate to="/home" replace /> },
//         { path: "home", element: <NewFeed /> },
//         { path: "profile", element: <UserProfile /> },
//       ]
//     },

//     // 🔒 AUTH ROUTES TEMPORARILY DISABLED
//     /*
//     {
//       path: "/auth",
//       element: <AuthLayout />,
//       children: [
//         { index: true, element: <Navigate to="/auth/login" replace /> },
//         { path: "registration", element: <Registration /> },
//         { path: "login", element: <Login /> }
//       ]
//     },
//     */

//     {
//       path: "*",
//       element: <NotFound />
//     }
//   ]);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <RouterProvider router={router} />
//     </div>
//   );
// }

// export default App;
