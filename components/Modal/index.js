import ResModal from "./ResModal";
import ColModal from "./ColModal/ColModal";
import BasicModal from "./BasicModal";
import CreateDashBoard from "./CreateDashBoard/CreateDashBoard";

const Modal = Object.assign(BasicModal, {
  Res: ResModal,
  Col: ColModal,
  Create: CreateDashBoard,
});

export default Modal;

