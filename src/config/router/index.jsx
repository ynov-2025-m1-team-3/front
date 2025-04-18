import { createBrowserRouter, RouterProvider } from "react-router";
import Homepage from "../../views/homepage";
import Uploadpage from "../../views/uploadJSON";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/upload-json",
    element: <Uploadpage />,
  }
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;