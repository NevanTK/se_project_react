import "./DeleteItemModal.css";

export default function DeleteItemModal({
  isOpen,
  onClose,
  closeActiveModal,
  deleteItem,
  onDeleteItem,
}) {
  function handleDeleteClick(evt) {
    evt.preventDefault();
    onDeleteItem();
    closeActiveModal();
  }

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="delete-modal__container">
        <div className="delete-modal__text">
          <p>Are you sure you want to delete this item?</p>
          <p>This action is irreversible.</p>
        </div>

        <button
          type="button"
          className="modal__close-btn"
          onClick={closeActiveModal}
        ></button>
        <button
          type="button"
          className="delete-modal__delete-btn"
          onClick={handleDeleteClick}
        >
          Yes, delete item
        </button>
        <button
          type="button"
          className="delete-modal__cancel-btn"
          onClick={closeActiveModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
