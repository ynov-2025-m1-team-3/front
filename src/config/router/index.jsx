import { createBrowserRouter, RouterProvider } from "react-router";
import Homepage from "../../views/homepage";
import Uploadpage from "../../views/uploadJSON";
import Login from "../../views/auth/login";
import Register from "../../views/auth/register";
import PrivateRoute from "../../components/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element:(
      <PrivateRoute> 
        <Homepage />
      </PrivateRoute>
    ),
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
