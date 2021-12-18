import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHorse, faSleigh } from "@fortawesome/free-solid-svg-icons";

import { AuthContext } from "../../contexts/AuthContext.js";

import "./Navigation.css";

function Navigation() {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav>
      <section>
        <NavLink activeClassName="active" exact to="/" className="logo-container">
          <FontAwesomeIcon icon={faSleigh} className="fa-2x logo" />
        </NavLink>
        <div>
          <NavLink activeClassName="active" exact to="/">
            Home
          </NavLink>

          {user.uid !== "" && user.uid ? (
            <>
              <NavLink activeClassName="active" exact to="/user/profile">
                {user.displayName === null
                  ? `Nice to meet you ${user.email}`
                  : `Wellcome back ${user.displayName}`}
              </NavLink>
              <NavLink activeClassName="active" exact to="/shops/mechanics">
                Mechanic Shops
              </NavLink>
              <NavLink activeClassName="active" exact to="/shops/body">
                Body Shops
              </NavLink>
              <NavLink activeClassName="active" exact to="/shops/performance">
                Performance Shops
              </NavLink>
              <NavLink activeClassName="active" exact to="/user/logout" onClick={logout}>
                Logout
              </NavLink>
            </>
          ) : (
            <>
              {" "}
              <NavLink activeClassName="active" exact to="/user/login">
                Login
              </NavLink>
              <NavLink activeClassName="active" exact to="/user/register">
                Register
              </NavLink>
            </>
          )}
        </div>
      </section>
    </nav>
  );
}

export default Navigation;
