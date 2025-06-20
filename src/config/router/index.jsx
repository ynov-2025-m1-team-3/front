import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";

// Lazy loading avec fallback plus robuste
const Homepage = lazy(() => 
  import("@/views/homepage").catch(() => ({
    default: () => <div>Erreur de chargement de la page d'accueil</div>
  }))
);

const Uploadpage = lazy(() => 
  import("@/views/uploadJSON").catch(() => ({
    default: () => <div>Erreur de chargement de la page upload</div>
  }))
);

const Login = lazy(() => 
  import("@/views/auth/login").catch(() => ({
    default: () => <div>Erreur de chargement de la page de connexion</div>
  }))
);

const Register = lazy(() => 
  import("@/views/auth/register").catch(() => ({
    default: () => <div>Erreur de chargement de la page d'inscription</div>
  }))
);

const Landingpage = lazy(() => 
  import("@/views/landingpage").catch(() => ({
    default: () => <div>Erreur de chargement de la page d'accueil</div>
  }))
);

const Dashboard = lazy(() => 
  import("@/views/dashboard").catch(() => ({
    default: () => <div>Erreur de chargement du tableau de bord</div>
  }))
);

const TestPage = lazy(() => 
  import("@/views/test").catch(() => ({
    default: () => <div>Erreur de chargement de la page de test</div>
  }))
);

const NotFoundPage = lazy(() => 
  import("@/views/notfound").catch(() => ({
    default: () => <div>Page non trouvée</div>
  }))
);

import PrivateRoute from "@/components/PrivateRoute";

// Composant de loading
const LoadingFallback = () => (
  <div style={{ 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center", 
    height: "100vh",
    fontFamily: "Arial, sans-serif"
  }}>
    <div>⏳ Chargement...</div>
  </div>
);

// Wrapper pour Suspense
const SuspenseWrapper = ({ children }) => (
  <Suspense fallback={<LoadingFallback />}>
    {children}
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/feedbackviewer",
    element: (
      <SuspenseWrapper>
        <PrivateRoute>
          <Homepage />
        </PrivateRoute>
      </SuspenseWrapper>
    ),
  },
  {
    path: "/",
    element: (
      <SuspenseWrapper>
        <Landingpage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/upload-json",
    element: (
      <SuspenseWrapper>
        <PrivateRoute>
          <Uploadpage />
        </PrivateRoute>
      </SuspenseWrapper>
    ),
  },
  {
    path: "/login",
    element: (
      <SuspenseWrapper>
        <Login />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/register",
    element: (
      <SuspenseWrapper>
        <Register />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <SuspenseWrapper>
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      </SuspenseWrapper>
    ),
  },
  {
    path: "/test",
    element: (
      <SuspenseWrapper>
        <TestPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "*",
    element: (
      <SuspenseWrapper>
        <NotFoundPage />
      </SuspenseWrapper>
    ),
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
