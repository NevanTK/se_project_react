import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import {useForm} from "../../Hooks/useForm";
import { useContext, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

const EditProfileModal = ({ isOpen, onClose, onUpdateUser }) => {
  const currentUser = useContext(CurrentUserContext);
console.log("currentUser in EditProfileModal:", currentUser);
// if (!currentUser) {
//     return null; // or return a loading indicator, or a message saying "User not found"
//   }

  const defaultValues = {
    name: "",
    avatar: "",
  };

  const { values, handleChange, handleReset, setValues } = useForm(defaultValues);

  useEffect(() => {
    if (currentUser && isOpen) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values, handleReset);
    onClose();
  }

  return (
    <ModalWithForm
      title="Edit Profile"
      name="edit-profile"
      isOpen={isOpen}
      closeActiveModal={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="edit-name" name="name" className="modal__lable">
        Name{" "}
        <input
          type="text"
          id="edit-name"
          name="name"
          className="modal__input"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
       <label htmlFor="edit-avatar" name="avatar" className="modal__lable">
        Avatar{" "}
        <input
          type="url"
         id="edit-avatar"
         name="avatar"
          className="modal__input"
          placeholder="Image URL"
         value={values.avatar}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;