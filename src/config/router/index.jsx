import { createBrowserRouter, RouterProvider } from "react-router";
import Homepage from "@views/homepage";
import Uploadpage from "@views/uploadJSON";
import Login from "@views/auth/login";
import Register from "@views/auth/register";
import PrivateRoute from "@components/PrivateRoute";
import Landingpage from "@views/landingpage";
import Dashboard from "@views/dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/welcome",
    element: <Landingpage />,
  },
  {
    path: "/upload-json",
    element: (
        <Uploadpage />
    ),
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
