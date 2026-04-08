import "./Header.css";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch";

function Header({ handleAddClick, weather }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <img src={logo} className="header__logo" alt="WTWR logo" />
        {currentDate}, {weather.city}
      </div>
      <div className="header__right">
        <ToggleSwitch />
        <button
          type="button"
          className="header__add-clothes-btn"
          onClick={handleAddClick}
        >
          + Add clothes
        </button>
        <div className="header__user-container">
          <p className="header__username">Terrence Tegegne</p>
          <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
        </div>
      </div>
    </header>
  );
}

export default Header;
