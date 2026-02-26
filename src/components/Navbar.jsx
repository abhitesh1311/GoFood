import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./ContextReducer";

const Navbar = () => {
  const navigate = useNavigate();
  const data = useCart();

  // ✅ correct token key
  const token = localStorage.getItem("authToken");

  // 👉 mobile menu state
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (confirmLogout) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("pendingCart");

      setIsOpen(false);
      navigate("/login");
      window.location.reload(); // quick refresh fix
    }
  };

  // 👉 close menu when any link clicked
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success fixed-top">
      <div className="container-fluid">
        <Link
          className="navbar-brand fs-1 fst-italic"
          to="/"
          onClick={closeMenu}
        >
          GoFood
        </Link>

        {/* Hamburger */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item fs-5 fst-italic">
              <Link className="nav-link" to="/" onClick={closeMenu}>
                Home
              </Link>
            </li>

            {/* logged in */}
            {token && (
              <li className="nav-item fs-5 fst-italic">
                <Link
                  className="nav-link"
                  to="/myorder"
                  onClick={closeMenu}
                >
                  Myorder
                </Link>
              </li>
            )}

            {/* not logged in */}
            {!token ? (
              <>
                <li className="nav-item fs-5 fst-italic">
                  <Link
                    className="nav-link"
                    to="/login"
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                </li>

                <li className="nav-item fs-5 fst-italic">
                  <Link
                    className="nav-link"
                    to="/signup"
                    onClick={closeMenu}
                  >
                    SignUp
                  </Link>
                </li>
              </>
            ) : (
              <>
                {/* Cart */}
                <li className="nav-item fs-5 fst-italic position-relative">
                  <Link
                    className="nav-link"
                    to="/cart"
                    onClick={closeMenu}
                  >
                    Cart 🛒
                    {data.length > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {data.length}
                      </span>
                    )}
                  </Link>
                </li>

                {/* Logout */}
                <li className="nav-item">
                  <button
                    className="btn text-white ms-3 fs-5 fst-italic"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;