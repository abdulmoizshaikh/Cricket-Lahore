// import * as reusableCode from "./reusableCode";
// import { toast, Bounce } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export { reusableCode };

export const _toast = (message, type) =>
  toast(message, {
    transition: Bounce,
    closeButton: true,
    autoClose: 3000,
    position: "bottom-center",
    type: type
  });

export const isEmailValid = email => {
  let emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
  return Boolean(emailValid);
};

export const isValueExist = value => {
  return Boolean(value);
};

export const isVerifyCodeValid = value => {
  return value.length >= 4 && value.length <= 6;
};

export const isImageValid = imgArray => {
  return imgArray.length > 0;
};

export const isContactNumberValid = number => {
  return number.length >= 10;
};

export const isPasswordValid = password => {
  return (
    password.length > 5 &&
    password.match(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
    )
  );
};

export const isPasswordRepeatValid = (passwordRepeat, password) => {
  return isPasswordValid(passwordRepeat) && passwordRepeat === password;
};

export const Constants = {
  passwordError:
    "  Password between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
};

export const Colors = {
  themeColor: "#10316b"
};