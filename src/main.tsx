import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./modules/auth/context/AuthContext";
import "./index.css";
import "./i18n";
import { CircularProgress, Box } from "@mui/material";

// Componente de carga mientras se inicializa i18n
const LoadingComponent = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100vh"
  >
    <CircularProgress />
  </Box>
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Suspense fallback={<LoadingComponent />}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Suspense>
  </React.StrictMode>
);
