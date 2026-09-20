import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../Hooks/useForm.js";
import { signUp, signIn } from "../../utils/auth.js";

const RegisterModal = ({ isOpen, onClose, onSignUp, onSwitchToLogin }) => {
  const defaultValues = {
    name: "",
    avatar: "",
    email: "",
    password: "",
  };

  const { values, handleChange, handleReset } = useForm(defaultValues);

  function handleSubmit(e) {
    e.preventDefault();

    signUp({
      name: values.name,
      avatar: values.avatar,
      email: values.email,
      password: values.password,
    })
      .then(() => signIn({ email: values.email, password: values.password }))
      .then((data) => {
        if (data && data.token) {
          try {
            localStorage.setItem("jwt", data.token);
          } catch (e) {
            console.error("Could not save token", e);
          }
          if (onSignUp) onSignUp(data.token);
        }
        onClose();
        handleReset();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <ModalWithForm
      title="Sign up"
      name="register"
      isOpen={isOpen}
      closeActiveModal={onClose}
      onSubmit={handleSubmit}
      buttonText="Sign up"
      secondaryButtonText="or Log in"
      secondaryButtonOnClick={() => {
        onClose();
        onSwitchToLogin();
        // You can add logic here to open the LoginModal if needed
      }}
    >
      <label htmlFor="register-email" name="email" className="modal__lable">
        Email{" "}
        <input
          type="email"
          id="register-email"
          name="email"
          className="modal__input"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="register-password" name="password" className="modal__lable">
        Password{" "}
        <input
          type="password"
          id="register-password"
          name="password"
          className="modal__input"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="register-name" name="name" className="modal__lable">
        Name{" "}
        <input
          type="text"
          id="register-name"
          name="name"
          className="modal__input"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="register-avatar" name="avatar" className="modal__lable">
        Avatar{" "}
        <input
          type="url"
          id="register-avatar"
          name="avatar"
          className="modal__input"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;

//https://calendly.com/pedro-laracuente-tripleten/30min
