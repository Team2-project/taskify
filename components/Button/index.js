import DefaultButton from "./Button.tsx";
import AddButton from "./AddButton/AddButton.tsx";
import ListButton from "./ListButton/ListButton.tsx";
import LinkButton from "./LinkButton/LinkButton.tsx";
import ArrowButton from "./ArrowButton/ArrowButton.tsx";
import DeleteButton from "./DeleteButton/DeleteButton.tsx";

const Button = Object.assign(DefaultButton, {
  Add: AddButton,
  List: ListButton,
  Link: LinkButton,
  Arrow: ArrowButton,
  Delete: DeleteButton,
});

export default Button;

