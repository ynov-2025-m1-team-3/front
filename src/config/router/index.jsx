import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "../../views/homepage";  
import Dashboard from "../../views/pages/dashboard";  

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />, 
  },
  {
    path: "/dashboard",
    element: <Dashboard />,  
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
