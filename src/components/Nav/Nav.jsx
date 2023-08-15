import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";

function Nav() {
  const user = useSelector((store) => store.user);
  const [button, setButton] = useState(true);
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/home" className="navbar-logo" onClick={closeMobileMenu}>
          {/* Nav Logo */}
          PLAY
          <i className="fa-solid fa-paw" />
          ME
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          {/* If no user is logged in, show these links */}
          {!user.id && (
            <>
              <li className="nav-item">
                <Link
                  className="nav-links item"
                  to="/home"
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-links item"
                  to="/login"
                  onClick={closeMobileMenu}
                >
                  Login / Register
                </Link>
              </li>
            </>
          )}

          {/* If a user is logged in, show these links */}
          {user.id && (
            <>
              <li className="nav-item">
                <Link
                  className="nav-links item"
                  to="/user"
                  onClick={closeMobileMenu}
                >
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-links item"
                  to="/petfinder"
                  onClick={closeMobileMenu}
                >
                  Animals
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-links item"
                  to="/review"
                  onClick={closeMobileMenu}
                >
                  Review
                </Link>
              </li>
              <li className="nav-item">
                <LogOutButton
                  className="nav-links logout-button"
                  onClick={closeMobileMenu}
                />
              </li>
            </>
          )}
          {/* AboutPage viewable to everyone */}
          <li className="nav-item">
            <Link className="nav-links item" to="/about" onClick={closeMobileMenu}>
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
