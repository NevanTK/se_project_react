import "./ModalWithForm.css";
import useEscapeClose from "../../Hooks/useModalClose.js";

function ModalWithForm({
  children,
  buttonText = "Save",
  title,
  closeActiveModal,
  isOpen,
  onSubmit,
}) {
  useEscapeClose(isOpen, closeActiveModal);
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__container">
        <h2 className="modal__title">{title}</h2>
        <button
          type="button"
          className="modal__close-btn"
          onClick={closeActiveModal}
        >
          {/* <img src="../../assets/Close.svg" alt="Close" /> */}
        </button>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <button
            type="submit"
            className="modal__submit-btn"
            onClick={closeActiveModal}
          >
            <label className="submit__label">{buttonText}</label>
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
