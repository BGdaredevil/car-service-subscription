import "./Navigation.module.css";

import { Link, NavLink, Redirect } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/users/profile">Profile</NavLink>
      <NavLink to="/shops/mechanics">Mechanic Shops</NavLink>
      <NavLink to="/shops/body">Body Shops</NavLink>
      <NavLink to="/shops/performance">Performance Shops</NavLink>
      <NavLink to="/user/loin">Login</NavLink>
      <NavLink to="/user/register">Register</NavLink>
      <NavLink to="/user/logout">Logout</NavLink>
    </nav>
  );
}

export default Navigation;
