import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

function ItemCard({ item, onCardClick, deleteItem, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);  
  const handleCardClick = () => {
    onCardClick(item);
  };
  const isLiked = item.likes.some(id => id === currentUser._id);
  const itemLikeButtonClassName = `card__like-btn ${isLiked ? "card__like-btn_liked" : ""}`;
  
  return (
    <li className="card">
      <h2 className="card__title">{item.name}</h2>
      <img
        onClick={handleCardClick}
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
      />
      <button
        onClick={onCardLike}
        className={itemLikeButtonClassName}
        aria-label={isLiked ? "Remove like" : "Add like"}
      />
    </li>
  );
}

export default ItemCard;
