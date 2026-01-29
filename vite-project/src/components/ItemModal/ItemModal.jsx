import "./ItemModal.css";

function ItemModal({ card, activeModal, closeActiveModal }) {
  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__container modal__container_image">
        <button
          type="button"
          className="modal__close-btn modal__close-btn_image"
          onClick={closeActiveModal}
        >
          Close
          {/* <img src="../../assets/Close.svg" alt="Close" /> */}
        </button>
        <img src={card.link} alt="" className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
