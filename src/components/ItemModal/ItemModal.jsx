import "./ItemModal.css";
import useEscapeClose from "../../Hooks/useModalClose.js";

function ItemModal({ card, closeActiveModal, isOpen, deleteItem }) {
  useEscapeClose(isOpen, closeActiveModal);

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__container modal__container_image">
        <button
          type="button"
          className="modal__close-btn modal__close-btn_image"
          onClick={closeActiveModal}
        ></button>
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <button className="modal__delete-btn" onClick={deleteItem}>
            Delete Item
          </button>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
