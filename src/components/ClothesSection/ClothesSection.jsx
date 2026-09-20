import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

export default function ClothesSection({
  clothingItems,
  handleCardClick,
  handleAddClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);
  const userItems = clothingItems.filter(
    (item) => currentUser && item.owner === currentUser._id,
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__rack">
        <p>Your Items</p>
        <button
          type="button"
          className="header__add-clothes-btn"
          onClick={handleAddClick}
        >
          + Add New
        </button>
      </div>

      <ul className="clothes-section__cards-list">
        {userItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
}
