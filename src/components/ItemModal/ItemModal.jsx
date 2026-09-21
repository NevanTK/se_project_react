import "./ItemModal.css";
import useEscapeClose from "../../Hooks/useModalClose.js";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

function ItemModal({
  card,
  closeActiveModal,
  isOpen,
  handleDeleteClick,
  deleteItem,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = currentUser && card.owner === currentUser._id;

  useEscapeClose(isOpen, closeActiveModal);

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__container modal__container_image">
        <button
          type="button"
          className="modal__close-btn modal__close-btn_image"
          onClick={closeActiveModal}
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          {isOwn && (
            <button className="modal__delete-btn" onClick={handleDeleteClick}>
              Delete item
            </button>
          )}
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
