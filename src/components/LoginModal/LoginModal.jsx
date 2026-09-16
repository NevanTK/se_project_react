import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../Hooks/useForm.js";
import { signIn } from "../../utils/auth.js";
import { useState } from "react";

const LoginModal = ({ isOpen, onClose, onSignIn, onSwitchToRegister }) => {
  const defaultValues = {
    email: "",
    password: "",
  };

  const { values, handleChange, handleReset } = useForm(defaultValues);
  const [loginError, setLoginError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setLoginError("");

    signIn({
      email: values.email,
      password: values.password,
    })
      .then((data) => {
        if (data?.token) {
          onSignIn(data.token);
        }
        handleReset();
      })
      .catch(() => {
        setLoginError("Email or password is incorrect.");
      });
  }

  return (
    <ModalWithForm
      title="Log in"
      name="login"
      isOpen={isOpen}
      closeActiveModal={onClose}
      onSubmit={handleSubmit}
      buttonText="Log in"
      secondaryButtonText="or Sign up"
      secondaryButtonOnClick={() => {
        onClose();
        onSwitchToRegister();
        // You can add logic here to open the RegisterModal if needed
      }}
    >
      <label htmlFor="login-email" name="email" className="modal__lable">
        Email{" "}
        <input
          type="email"
          id="login-email"
          name="email"
          className="modal__input"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="login-password" name="password" className="modal__lable">
        Password{" "}
        <input
          type="password"
          id="login-password"
          name="password"
          className="modal__input"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
      {loginError && <p className="modal__error">{loginError}</p>}
    </ModalWithForm>
  );
};

export default LoginModal;

//https://calendly.com/pedro-laracuente-tripleten/30min
