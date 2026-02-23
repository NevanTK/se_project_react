import { useEffect, useState } from "react";

import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import { getWeather, parseWeatherData } from "../../utils/weatherApi.js";
import { coordinates, apiKey } from "../../utils/constants.js";
import { defaultClothingItems } from "../../utils/constants.js";
import useEscapeClose from "../Hooks/useModalClose.js";

function App() {
  const [weather, setWeather] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [defaultItems, setDefaultItems] = useState([]);

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
    setDefaultItems(defaultClothingItems);
  }, []);

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const parsedWeather = parseWeatherData(data);
        setWeather(parsedWeather);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="app">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weather={weather} />
        <Main
          weather={weather}
          handleCardClick={handleCardClick}
          defaultItems={defaultItems}
        />
        <Footer />
      </div>
      <ModalWithForm
        buttonText="Add Garment"
        title="New Garment"
        isOpen={activeModal === "add-garment"}
        closeActiveModal={closeActiveModal}
        useEscapeClose={useEscapeClose}
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
        useEscapeClose={useEscapeClose}
      />
    </div>
  );
}

export default App;
