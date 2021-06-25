import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="container my-5  border p-2 ">
          <header >
            <nav className="nav ">
              <Link className="nav-link" to="/">BLAZE
              </Link>
              <Link className="nav-link" to="/orders">
                Orders
              </Link>
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </nav>
          </header>
    </div>
  );
}

export default Header;
