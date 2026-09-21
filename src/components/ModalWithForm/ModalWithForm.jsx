import "./ModalWithForm.css";
import useEscapeClose from "../../Hooks/useModalClose.js";

function ModalWithForm({
  children,
  buttonText = "Save",
  secondaryButtonText,
  secondaryButtonOnClick,
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
        />
        <form className="modal__form" onSubmit={onSubmit}>
          {children}

          <div className="modal__actions">
            <button type="submit" className="modal__submit-btn">
              {buttonText}
            </button>

            {secondaryButtonText && (
              <button
                type="button"
                className="modal__secondary-btn"
                onClick={secondaryButtonOnClick}
              >
                {secondaryButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
