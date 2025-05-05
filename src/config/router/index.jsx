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
    path: "/feedbackviewer",
    element: 
      <PrivateRoute>
        <Homepage />
      </PrivateRoute>,
  },
  {
    path: "/",
    element: <Landingpage />,
  },
  {
    path: "/upload-json",
    element: (
      <PrivateRoute>
        <Uploadpage />
      </PrivateRoute>
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
    element: 
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ,
  }
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
