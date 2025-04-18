import { createBrowserRouter, RouterProvider } from "react-router";
import Homepage from "../../views/homepage";
import Login from "../../views/auth/login";
import Register from "../../views/auth/register";
import FeedBack from "../../views/feedback";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
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
    path: "/feedback",
    element: <FeedBack />,
  }

]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;