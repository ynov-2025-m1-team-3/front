import { createBrowserRouter, RouterProvider } from "react-router";
import Homepage from "@views/homepage";
import Uploadpage from "@views/uploadJSON";
import Login from "@views/auth/login";
import Register from "@views/auth/register";
import PrivateRoute from "@components/PrivateRoute";
import Landingpage from "@views/landingpage";

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
  }
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
