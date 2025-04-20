import { createBrowserRouter, RouterProvider } from "react-router";
import Homepage from "../../views/homepage";
import Uploadpage from "../../views/uploadJSON";
import Login from "../../views/auth/login";
import Register from "../../views/auth/register";
import Dashboard from "../../views/dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/upload-json",
    element: <Uploadpage />,
  },
  { 
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  }
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;