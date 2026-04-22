import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
// import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import { getWeather, parseWeatherData } from "../../utils/weatherApi.js";
import { coordinates, apiKey } from "../../utils/constants.js";
import { defaultClothingItems } from "../../utils/constants.js";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import { getItems } from "../../utils/api.js";
import { deleteItem } from "../../utils/api.js";
import DeleteItemModal from "../DeleteItemModal/DeleteItemModal.jsx";

function App() {
  const [weather, setWeather] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: true,
  });

  // console.log(CurrentTemperatureUnitContext);

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  // const [defaultItems, setDefaultItems] = useState(defaultClothingItems);
  const [currentTemperatureUnit, setTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  const handleToggleSwitchChange = () => {
    setTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
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

  const handleDeleteClick = () => {
    setActiveModal("delete-confirmation");
  };

  const onAddItem = (item) => {
    const newItem = {
      name: item.name,
      imageUrl: item.imageUrl,
      weather: item.weather,
    };

    addItem(newItem)
      .then((addedItem) => {
        setClothingItems([addedItem, ...clothingItems]);
        closeAllModals();
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const parsedWeather = parseWeatherData(data);
        setWeather(parsedWeather);
      })
      .catch(console.error);

    getItems()
      .then((data) => {
        data.reverse();
        setClothingItems(data);
      })

      .catch(console.error);
  }, []);

  // deleteItem = (itemId) => {
  //   return fetch(`${baseUrl}/items/${itemId}`, {
  //     method: "DELETE",
  //     headers,
  //   }).then(handleServerResonse);
  // };

  //add delete item functionality in profile page and add delete button to item card in profile page
  //declare delete function in app component that takes item id as argument and calls api to delete item from database and then updates clothing items state by filtering out the deleted item
  //pass delete function to profile page and then to item card and then add delete button to item card and then add on click event to delete button that calls the delete function with the item id and then remove the item from the clothing items state in the app component

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="app">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weather={weather} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weather={weather}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  temperatureUnit={currentTemperatureUnit}
                  deleteItem={deleteItem}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                  deleteItem={deleteItem}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        {/* <ModalWithForm
          buttonText="Add Garment"
          title="New Garment"
          isOpen={activeModal === "add-garment"}
          closeActiveModal={closeActiveModal}
        >
          {" "}
          
        </ModalWithForm> */}
        <AddItemModal
          title="New Garment"
          name="add-garment"
          isOpen={activeModal === "add-garment"}
          onClose={closeActiveModal}
          onAddItem={onAddItem}
        />

        <ItemModal
          card={selectedCard}
          isOpen={activeModal === "preview"}
          closeActiveModal={closeActiveModal}
          handleDeleteClick={handleDeleteClick}

          // deleteItem={() => {
          //   deleteItem(selectedCard._id)
          //     .then(() => {
          //       setClothingItems(
          //         clothingItems.filter((item) => item._id !== selectedCard._id),
          //       );
          //       closeActiveModal();
          //     })
          //     .catch(console.error);
          // }}
        />

        <DeleteItemModal
          isOpen={activeModal === "delete-confirmation"}
          closeActiveModal={closeActiveModal}
          // deleteItem={() => {
          //   deleteItem(selectedCard._id)
          //     .then(() => {
          //       setClothingItems(
          //         clothingItems.filter((item) => item._id !== selectedCard._id),
          //       );
          //       closeActiveModal();
          //     })
          //     .catch(console.error);
          // }}
        />
      </div>{" "}
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
