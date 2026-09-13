import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../Hooks/useForm.js";
import { signIn } from "../../utils/auth.js";

const LoginModal = ({ isOpen, onClose, onSignIn }) => {
  const defaultValues = {
    email: "",
    password: "",
  };

  const { values, handleChange, handleReset } = useForm(defaultValues);

  function handleSubmit(e) {
    e.preventDefault();

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
      .catch((err) => {
        console.error(err);
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
      secondaryButtonText="Sign up"
      secondaryButtonOnClick={() => {
        onClose();
        // You can add logic here to open the RegisterModal if needed
      }}
    >
      <label htmlFor="email" name="email" className="modal__lable">
        Email{" "}
        <input
          type="email"
          id="email"
          name="email"
          className="modal__input"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="password" name="password" className="modal__lable">
        Password{" "}
        <input
          type="password"
          id="password"
          name="password"
          className="modal__input"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;

//https://calendly.com/pedro-laracuente-tripleten/30min
