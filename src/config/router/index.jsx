import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "../../views/homepage";  

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />, 
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
