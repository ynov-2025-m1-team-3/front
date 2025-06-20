import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";

const Homepage = lazy(() => import("@/views/homepage"));
const Uploadpage = lazy(() => import("@/views/uploadJSON"));
const Login = lazy(() => import("@/views/auth/login"));
const Register = lazy(() => import("@/views/auth/register"));
const Landingpage = lazy(() => import("@/views/landingpage"));
const Dashboard = lazy(() => import("@/views/dashboard"));
const TestPage = lazy(() => import("@/views/test"));
const NotFoundPage = lazy(() => import("@/views/notfound"));

import PrivateRoute from "@/components/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/feedbackviewer",
    element: (
      <PrivateRoute>
        <Homepage />
      </PrivateRoute>
    ),
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
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },  {
    path: "/test",
    element: <TestPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
