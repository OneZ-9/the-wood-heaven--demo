import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import { StyleSheetManager } from "styled-components";
import CabinTable from "./CabinTable";

function AddCabin() {
  return (
    <Modal>
      <StyleSheetManager shouldForwardProp={(prop) => prop !== "variation"}>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
      </StyleSheetManager>

      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>

      {/* We can have multiple windows inside same model component */}
      <Modal.Open opens="table">
        <Button>Show table</Button>
      </Modal.Open>

      <Modal.Window name="table">
        <CabinTable />
      </Modal.Window>
    </Modal>
  );
}

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   return (
//     <div>
//       <StyleSheetManager shouldForwardProp={(prop) => prop !== "variation"}>
//         <Button onClick={() => setIsOpenModal((isOpenModal) => !isOpenModal)}>
//           Add new cabin
//         </Button>
//       </StyleSheetManager>

//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
