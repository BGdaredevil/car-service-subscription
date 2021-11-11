import classes from "./Navigation.module.css";

import { NavLink, useHistory } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext.js";
// import { Nav } from "react-bootstrap";

function Navigation() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav>
      <NavLink activeClassName={classes.active} exact to="/">
        WIP: LOGO
      </NavLink>
      <div>
        <NavLink activeClassName={classes.active} exact to="/">
          Home
        </NavLink>
        <NavLink activeClassName={classes.active} exact to="/users/profile">
          Wellcome back {user && user.displayName}
        </NavLink>
        <NavLink activeClassName={classes.active} exact to="/shops/mechanics">
          Mechanic Shops
        </NavLink>
        <NavLink activeClassName={classes.active} exact to="/shops/body">
          Body Shops
        </NavLink>
        <NavLink activeClassName={classes.active} exact to="/shops/performance">
          Performance Shops
        </NavLink>
        <NavLink activeClassName={classes.active} exact to="/user/login">
          Login
        </NavLink>
        <NavLink activeClassName={classes.active} exact to="/user/register">
          Register
        </NavLink>
        <NavLink activeClassName={classes.active} exact to="/user/logout" onClick={logout}>
          Logout
        </NavLink>
      </div>
    </nav>
  );
}

// function Navigation() {
//   return (
//     <Nav variant="pills" defaultActiveKey="/home">
//       <Nav.Item>
//         <Nav.Link href="/home">Active</Nav.Link>
//       </Nav.Item>
//       <Nav.Item>
//         <Nav.Link eventKey="link-1">Option 2</Nav.Link>
//       </Nav.Item>
//       <Nav.Item>
//         <Nav.Link eventKey="disabled" disabled>
//           Disabled
//         </Nav.Link>
//       </Nav.Item>
//     </Nav>
//   );
// }

export default Navigation;
