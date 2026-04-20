import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard.jsx";

export default function ClothesSection({ clothingItems, handleCardClick }) {
  return (
    <div className="clothes-section">
      <div className="clothing__rack">
        <p>Clothing</p>
        <button>Add</button>
      </div>
      <ul className="clothes-section__cards-list">
        {clothingItems.map((item) => {
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
