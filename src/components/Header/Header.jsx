import "./Header.css";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/avatar.svg";
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
  onSignOut,
  currentUser,
}) {
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
                <img
                  src={(currentUser && currentUser.avatar) || avatar}
                  alt={(currentUser && currentUser.name) || "User"}
                  className="header__avatar"
                />
              </div>
            </NavLink>
            <button className="header__signout-btn" onClick={onSignOut}>
              Sign out
            </button>
          </>
        ) : (
          <>
            <button className="header__login-btn" onClick={onLoginClick}>
              Log in
            </button>
            <button className="header__signup-btn" onClick={onRegisterClick}>
              Sign up
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
