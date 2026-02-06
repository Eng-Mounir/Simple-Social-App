import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import MainLayout from './Layouts/MainLayout';
import AuthLayout from './Layouts/AuthLayout'; 
import NewFeed from "./Pages/NewFeed/NewFeed";
import UserProfile from "./Pages/UserProfile/UserProfile";
import NotFound  from './Pages/NotFound/NotFound';
import Registration from './Pages/Auth/Registration/Registration';
import Login from './Pages/Auth/Login/Login';
function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <MainLayout />,
      children: [
        { index: true, element: <Navigate to="/home" /> },
        { path: "/home", element: <NewFeed /> },
        { path: "/profile", element: <UserProfile /> },
        { path: "*", element: <NotFound /> }
      ]
    },{
      path: "",
      element: <AuthLayout />,
      children: [
        { path: "/registration", element: <Registration /> },
        { path: "/login", element: <Login /> }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
