import "./Header.css";
import logo from "../../assets/Logo.svg";
import ToggleSwitch from "../ToggleSwitch";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

function Header({
  handleAddClick,
  weather,
  isLoggedIn,
  onLoginClick,
  onRegisterClick,
}) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <NavLink to="/">
          <img src={logo} className="header__logo" alt="WTWR logo" />
        </NavLink>
        {currentDate}, {weather.city}
      </div>
      <div className="header__right">
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button
              type="button"
              className="header__add-clothes-btn"
              onClick={handleAddClick}
            >
              + Add clothes
            </button>
            <NavLink className="header__profile-link" to="/profile">
              <div className="header__user-container">
                <p className="header__username">
                  {(currentUser && currentUser.name) || "Profile"}
                </p>
                {currentUser && currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="header__avatar"
                  />
                ) : (
                  <span className="header__avatar-placeholder">
                    {currentUser?.name?.charAt(0) || "?"}
                  </span>
                )}
              </div>
            </NavLink>
          </>
        ) : (
          <>
            {" "}
            <button className="header__signup-btn" onClick={onRegisterClick}>
              Sign up
            </button>
            <button className="header__login-btn" onClick={onLoginClick}>
              Log in
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
