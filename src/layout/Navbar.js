import React from "react";
import { Link } from "react-router-dom";
import history from "../history";
const Navbar = () => {
  const logout = () => {
    localStorage.clear("token");
    history.push("/signin");
    window.location.reload(true);
  };
  const addProduct = () => {
    history.push("/addproduct");
    window.location.reload(true);
  };
  const token = localStorage.getItem("token");

  return (
    <nav className="navbar navbar-light bg-warning">
      <div className="container">
        <Link className="navbar-brand mb-0 h1" to="/">
          KTP Shop
        </Link>
        {token ? (
          <div>
            <button
              className="btn btn-success"
              style={{ marginRight: 10 }}
              onClick={addProduct}
            >
              Add
            </button>
            <button className="btn btn-danger" onClick={logout}>
              LogOut
            </button>
          </div>
        ) : (
          <div>
            <Link className="navbar-brand mb-0 h1" to="/signin">
              Login
            </Link>
            <Link className="navbar-brand mb-0 h1" to="/signup">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
