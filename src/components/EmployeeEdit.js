import { useParams } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "./MyContext";
import CustomForm from "./CustomForm";

const EmployeeEdit = () => {
  const { id } = useParams();
  const { employeeList, setEmployeeList } = useContext(MyContext);

  const selectedEmployee = employeeList.filter(
    (employee) => employee.id === parseInt(id)
  );

  return (
    <CustomForm selectedEmployee={selectedEmployee[0]}
      id={id}
      employeeList={employeeList}
      setEmployeeList={setEmployeeList} />
  );
};

export default EmployeeEdit;
