import { useContext } from "react";
import { MyContext } from "./MyContext";
import CustomForm from "./CustomForm";

const EmployeeAdd = () => {
  const { employeeList, setEmployeeList } = useContext(MyContext);
  return (
    <CustomForm employeeList={employeeList} setEmployeeList={setEmployeeList} />
  );
};

export default EmployeeAdd;
