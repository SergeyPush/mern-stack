import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/Auth.context";

const Navbar = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const logoutHandler = event => {
    // event.preventDefault();
    auth.logout();
    history.push("/");
  };
  return (
    <div>
      <nav>
        <div
          className="nav-wrapper blue darken-1"
          style={{ padding: "0 2rem" }}
        >
          <span to="#" className="brand-logo">
            Something with links
          </span>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <NavLink to="/create" activeClassName="blue">
                Create
              </NavLink>
            </li>
            <li>
              <NavLink to="/links" activeClassName="blue">
                Links
              </NavLink>
            </li>
            <li>
              <a href="/" onClick={logoutHandler}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
