import "./Header.css";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/Avatar.svg";

function Header({ handleAddClick, weather }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img src={logo} className="header__logo" />
      <p className="header__setting">
        {currentDate}, {weather.city}
      </p>
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
    </header>
  );
}

export default Header;
