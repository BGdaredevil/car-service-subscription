import { useContext } from "react";
import { Redirect, Route } from "react-router";
import { AuthContext } from "./AuthContext.js";

function RouteGuard({ component: RouteComponent, ...rest }) {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        user ? <RouteComponent {...routeProps} /> : <Redirect to={"/user/login"} />
      }
    />
  );
}

export default RouteGuard;
