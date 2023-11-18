import { Auth0Provider } from "@auth0/auth0-react";
import { ChildrenProps } from "./childrenProps.tsx";

const Auth = ({ children }: ChildrenProps) => {
  {
    return (
      <Auth0Provider
        domain="wonder-why.us.auth0.com"
        clientId="*"
        authorizationParams={{
          redirect_uri: "http://localhost:3003/moveit/",
        }}
      >
        {children}
      </Auth0Provider>
    );
  }
};
export default Auth;
