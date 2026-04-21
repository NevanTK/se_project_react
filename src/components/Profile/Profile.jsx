import ClothesSection from "../ClothesSection/ClothesSection";
import Sidebar from "../Sidebar/Sidebar";
import "./Profile.css";

export default function Profile({
  clothingItems,
  handleCardClick,
  deleteItem,
}) {
  return (
    <section className="profile">
      <Sidebar />
      <ClothesSection
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        deleteItem={deleteItem}
      />
    </section>
  );
}
