import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

export default function ClothesSection({
  clothingItems,
  handleCardClick,
  handleAddClick,
}) {
  const currentUser = useContext(CurrentUserContext);
const isOwn = currentUser && clothingItems.some(item => item.owner === currentUser._id);

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
        {isOwn && clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}
