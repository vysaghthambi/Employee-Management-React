import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CustomModal from "./CustomModal";

const TableBody = ({ employee, handleDelete }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <tr>
      <td>{employee.id}</td>
      <td>{employee.name}</td>
      <td>{employee.email}</td>
      <td>{employee.designation}</td>
      <td>{employee.salary}</td>
      <td>{employee.phone}</td>
      <td>
        <button
          className="btn btn-success mx-3"
          onClick={() => navigate(`/edit/${employee.id}`)}
        >
          Edit
        </button>
        <button className="btn btn-danger" onClick={toggleModal}>
          Delete
        </button>
        <CustomModal
          isEdit={false}
          isOpen={isOpen}
          toggleModal={toggleModal}
          handleDelete={handleDelete}
          id={employee.id}
        />
      </td>
    </tr>
  );
};

export default TableBody;
