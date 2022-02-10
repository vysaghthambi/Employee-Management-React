import { Modal, ModalBody, ModalFooter } from "reactstrap";

const CustomModal = ({
  isEdit,
  isOpen,
  toggleModal,
  handleSubmit,
  onSubmit,
  handleDelete,
  id
}) => {
  return (
    <Modal isOpen={isOpen} toggle={toggleModal}>
      <ModalBody>
        Are You sure? Do You Want To {isEdit ? "Update" : "Delete"} Employee
        With ID : {id} ?
      </ModalBody>
      <ModalFooter>
        <button type="button" className="btn btn-danger" onClick={toggleModal}>
          No
        </button>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => (isEdit ? handleSubmit(onSubmit)() : handleDelete())}
        >
          Yes
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default CustomModal;
