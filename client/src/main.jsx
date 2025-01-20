import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "sonner";
import { Auth0Provider } from "@auth0/auth0-react";
import { getEnvVariables } from "./utils/getEnvVariables.js";
const { VITE_APP_AUTH0_DOMAIN, VITE_APP_AUTH0_CLIENT_ID } = getEnvVariables();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain={VITE_APP_AUTH0_DOMAIN}
      clientId={VITE_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <Toaster position="bottom-right" richColors />
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
