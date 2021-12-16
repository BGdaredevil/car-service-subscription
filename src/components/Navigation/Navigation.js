import "./Navigation.css";

import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext.js";

function Navigation() {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav>
      <section>
        <NavLink activeClassName="active" exact to="/">
          WIP: LOGO
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
