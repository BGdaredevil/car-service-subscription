import classes from "./Navigation.module.css";

import { Link, NavLink, Redirect } from "react-router-dom";
// import { Nav } from "react-bootstrap";

function Navigation() {
  return (
    <nav>
      <NavLink activeClassName={classes.active} exact to="/">
        Home
      </NavLink>
      <NavLink activeClassName={classes.active} exact to="/users/profile">
        Profile
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
      <NavLink activeClassName={classes.active} exact to="/user/loin">
        Login
      </NavLink>
      <NavLink activeClassName={classes.active} exact to="/user/register">
        Register
      </NavLink>
      <NavLink activeClassName={classes.active} exact to="/user/logout">
        Logout
      </NavLink>
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
