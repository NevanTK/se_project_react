import { Route, Routes, Navigate } from "react-router-dom";
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
// import { defaultClothingItems } from "../../utils/constants.js";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import { getItems, getCurrentUser } from "../../utils/api.js";
import { deleteItem } from "../../utils/api.js";
import { addItem } from "../../utils/api.js";
import DeleteItemModal from "../DeleteItemModal/DeleteItemModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import EditProfileModal from "../EditProfile/EditProfileModal.jsx";

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
  const [currentTemperatureUnit, setTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    console.log(card);
  };

  const handleDeleteClick = () => {
    setActiveModal("delete-confirmation");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    !isLiked
      ? api
          .addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item)),
            );
          })
          .catch((err) => console.log(err))
      : api
          .removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item)),
            );
          })
          .catch((err) => console.log(err));
  };

  const onAddItem = (item, resetForm) => {
    const newItem = {
      name: item.name,
      imageUrl: item.imageUrl,
      weather: item.weather,
    };

    addItem(newItem)
      .then((addedItem) => {
        setClothingItems([addedItem, ...clothingItems]);
        resetForm();
        closeActiveModal();
      })
      .catch(console.error);
  };



  const onDeleteItem = () => {
    deleteItem(selectedCard._id)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => item._id !== selectedCard._id),
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const onCardLike = () => {
    handleCardLike(selectedCard);
  };

  const onSignIn = (token) => {
    try {
      if (token) localStorage.setItem("jwt", token);
    } catch (e) {
      console.error("Could not save token", e);
    }
    // validate and fetch current user after storing token
    if (token) {
      getCurrentUser(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error("Failed to fetch user after sign-in", err);
        });
    } else {
      setIsLoggedIn(true);
    }
    closeActiveModal();
  };

  const onUpdateUser = (updatedUser) => {
    setCurrentUser(updatedUser);
  };

  const onSignOut = () => {
    try {
      localStorage.removeItem("jwt");
    } catch (e) {
      console.error("Could not remove token", e);
    }
    setIsLoggedIn(false);
    setCurrentUser(null);
    setActiveModal("");
  };

  const onSignUp = (userData) => {
    onSignIn(userData);
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    getCurrentUser(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error("Token validation failed", err);
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
      });
  }, []);

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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page"></div>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="app">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weather={weather}
              isLoggedIn={isLoggedIn}
              onLoginClick={handleLoginClick}
              onRegisterClick={handleRegisterClick}
              onSignOut={onSignOut}
              currentUser={currentUser}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weather={weather}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    temperatureUnit={currentTemperatureUnit}
                    onCardLike={onCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  isLoggedIn ? (
                    <Profile
                      handleAddClick={handleAddClick}
                      clothingItems={clothingItems}
                      handleCardClick={handleCardClick}
                      deleteItem={deleteItem}
                      currentUser={currentUser}
                      handleEditProfileClick={handleEditProfileClick}
                    />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
            </Routes>
            <LoginModal
              isOpen={activeModal === "login"}
              onClose={closeActiveModal}
              onSignIn={onSignIn}
            />
            <RegisterModal
              isOpen={activeModal === "register"}
              onClose={closeActiveModal}
              onSignUp={onSignUp}
            />
            <EditProfileModal
              isOpen={activeModal === "edit-profile"}
              onClose={closeActiveModal}
              onUpdateUser={onUpdateUser}
            />
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
          />

          <DeleteItemModal
            isOpen={activeModal === "delete-confirmation"}
            closeActiveModal={closeActiveModal}
            handleDeleteClick={handleDeleteClick}
            onDeleteItem={onDeleteItem}
          />
        </div>{" "}
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
