import ClothesSection from "../ClothesSection/ClothesSection";
import Sidebar from "../Sidebar/Sidebar";
import "./Profile.css";

export default function Profile({
  clothingItems,
  handleCardClick,
  deleteItem,
  handleAddClick,
  onSignOut,
  handleEditProfileClick,
  onCardLike,
}) {
  return (
    <section className="profile">
      <Sidebar
        handleEditProfileClick={handleEditProfileClick}
        onSignOut={onSignOut}
      />
      <ClothesSection
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        deleteItem={deleteItem}
        handleAddClick={handleAddClick}
        onCardLike={onCardLike}
      />
    </section>
  );
}
