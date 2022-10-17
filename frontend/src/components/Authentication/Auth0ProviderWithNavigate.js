import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useLocation, useNavigate } from "react-router-dom";

export const Auth0ProviderWithHistory = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const domain = "router-practice.us.auth0.com";
  const clientId = "U22ALko0J7IGq8wYqrXYyVc0ZkKzWLeC";
  const redirectUri = "http://127.0.0.1:3000/home";

  const onRedirectCallback = (appState) => {
    console.log(appState, window.location.pathname, pathname);
    navigate(appState?.returnTo || window.location.pathname);
  };

  if (!(domain && clientId)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={redirectUri}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
