import { useEffect, useState } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, parseWeatherData } from "../../utils/weatherApi.js";
import { coordinates, apiKey } from "../../utils/constants.js";
import { defaultClothingItems } from "../../utils/constants.js";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";

function App() {
  const [weather, setWeather] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });

  // console.log(CurrentTemperatureUnitContext);

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [defaultItems, setDefaultItems] = useState(defaultClothingItems);
  const [temperatureUnit, setTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setTemperatureUnit(temperatureUnit === "F" ? "C" : "F");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const parsedWeather = parseWeatherData(data);
        setWeather(parsedWeather);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ temperatureUnit, handleToggleSwitchChange }}
    >
      <div className="app">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weather={weather} />
          <Main
            weather={weather}
            handleCardClick={handleCardClick}
            defaultItems={defaultItems}
            currentTemperatureUnit={temperatureUnit}
          />
          <Footer />
        </div>
        <ModalWithForm
          buttonText="Add Garment"
          title="New Garment"
          isOpen={activeModal === "add-garment"}
          closeActiveModal={closeActiveModal}
        >
          {" "}
          <label htmlFor="name" className="modal__lable">
            Name{" "}
            <input
              type="text"
              id="name"
              className="modal__input"
              placeholder="Name"
              required
            />
          </label>
          <label htmlFor="imageUrl" className="modal__lable">
            Image{" "}
            <input
              type="url"
              id="imageUrl"
              className="modal__input"
              placeholder="Image URL"
              required
            />
          </label>
          <fieldset className="modal__radio-btns">
            <legend className="modal__legend">Select the weather type:</legend>
            <label htmlFor="hot" className="modal__radio-lable">
              <input
                type="radio"
                id="hot"
                name="weather"
                className="modal__radio-input"
              />
              <span className="modal__radio-span">Hot</span>
            </label>
            <label htmlFor="warm" className="modal__radio-lable">
              <input
                type="radio"
                id="warm"
                name="weather"
                className="modal__radio-input"
              />
              <span className="modal__radio-span">Warm</span>
            </label>
            <label htmlFor="cold" className="modal__radio-lable">
              <input
                type="radio"
                id="cold"
                name="weather"
                className="modal__radio-input"
              />
              <span className="modal__radio-span">Cold</span>
            </label>
          </fieldset>
        </ModalWithForm>
        <ItemModal
          card={selectedCard}
          isOpen={activeModal === "preview"}
          closeActiveModal={closeActiveModal}
        />
      </div>
      //{" "}
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
