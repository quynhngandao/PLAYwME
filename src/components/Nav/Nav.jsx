import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
/***** FUNCTION *****/
function Nav() {
  // useSelector
  const user = useSelector((store) => store.user);
/***** RENDER *****/
  return (
    <div className="nav">
      <Link to="/home">
        {/* Nav Logo */}
        <h2 className="nav-title">
          PLAY
          <i className="fa-solid fa-paw" />
          ME
        </h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login
          <>
            <Link className="navLink" to="/home">
              Home
            </Link>
            {/* registration links */}
            <Link className="navLink" to="/login">
              Login / Register
            </Link>
          </>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              Profile
            </Link>

            <Link className="navLink" to="/petfinder">
              Animals
            </Link>

            <Link className="navLink" to="/review">
              Review
            </Link>
            {/* Logout Button */}
            <LogOutButton className="navLink"/>
          </>
        )}
        {/* AboutPage viewable to everyone */}
        <Link className="navLink" to="/about">
          About
        </Link>
      </div>
    </div>
  );
}

export default Nav;
