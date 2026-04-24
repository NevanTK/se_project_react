import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../Hooks/useForm.js";

const AddItemModal = ({ isOpen, onClose, onAddItem }) => {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weather: "",
  };

  const { values, handleChange } = useForm(defaultValues);

  function handleSubmit(event) {
    event.preventDefault();
    onAddItem(values);
    onClose();
  }

  return (
    <ModalWithForm
      title="New Garment"
      name="add-garment"
      onAddItem={onAddItem}
      isOpen={isOpen}
      closeActiveModal={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" name="name" className="modal__lable">
        Name{" "}
        <input
          type="text"
          id="name"
          className="modal__input"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="imageUrl" name="imageUrl" className="modal__lable">
        Image{" "}
        <input
          type="url"
          id="imageUrl"
          className="modal__input"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
          required
        />
      </label>
      <fieldset className="modal__radio-btns">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__radio-lable">
          <input
            type="radio"
            id="hot"
            name="weather"
            className="modal__radio-input"
            value="hot"
            onChange={handleChange}
          />
          <span className="modal__radio-span">Hot</span>
        </label>
        <label htmlFor="warm" className="modal__radio-lable">
          <input
            type="radio"
            id="warm"
            name="weather"
            className="modal__radio-input"
            value="warm"
            onChange={handleChange}
          />
          <span className="modal__radio-span">Warm</span>
        </label>
        <label htmlFor="cold" className="modal__radio-lable">
          <input
            type="radio"
            id="cold"
            name="weather"
            className="modal__radio-input"
            value="cold"
            onChange={handleChange}
          />
          <span className="modal__radio-span">Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;

//https://calendly.com/pedro-laracuente-tripleten/30min
