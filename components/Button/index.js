import DefaultButton from "./Button.tsx";
import ArrowButton from "./ArrowButton/ArrowButton.tsx";
import DeleteButton from "./DeleteButton/DeleteButton.tsx";
import AddButton from "./AddButton/AddButton.tsx";

const Button = Object.assign(DefaultButton, {
  Arrow: ArrowButton,
  Delete: DeleteButton,
  Add: AddButton,
});

export default Button;

