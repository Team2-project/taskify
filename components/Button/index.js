import DefaultButton from "./Button.tsx";
import ArrowButton from "./ArrowButton/ArrowButton.tsx";

const Button = Object.assign(DefaultButton, {
  Arrow: ArrowButton,
});

export default Button;

