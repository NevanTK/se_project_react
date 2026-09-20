import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

function ItemCard({ item, onCardClick, deleteItem, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const handleCardClick = () => {
    onCardClick(item);
  };
  const isLiked = Boolean(
    currentUser &&
      Array.isArray(item.likes) &&
      item.likes.some((id) => String(id) === String(currentUser._id)),
  );
  const itemLikeButtonClassName = `card__like-btn ${
    isLiked ? "card__like-btn_liked" : ""
  }`;

  return (
    <li className="card">
      <div className="card__item">
        <h2 className="card__title">{item.name}</h2>
        <button
          type="button"
          className={itemLikeButtonClassName}
          onClick={() => onCardLike({ id: item._id, isLiked })}
          aria-label={isLiked ? "Remove like" : "Add like"}
        />
      </div>
      <img
        onClick={handleCardClick}
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
      />
    </li>
  );
}

export default ItemCard;
