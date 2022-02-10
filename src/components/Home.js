import TableBody from "./TableBody";
import api from "./Axios";
import { MyContext } from "./MyContext";
import { useContext } from "react";

const Home = () => {
  const { employeeList, setEmployeeList } = useContext(MyContext);

  const handleDelete = async (id) => {
    await api.delete(`/employees/${id}`);
    setEmployeeList(employeeList.filter((employee) => employee.id !== id));
  };

  const tableBody = employeeList.map((employee) => (
    <TableBody
      key={employee.id}
      employee={employee}
      handleDelete={() => handleDelete(employee.id)}
    />
  ));

  return (
    <div className="container mt-5">
      {employeeList.length ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Designation</th>
              <th>Salary</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{tableBody}</tbody>
        </table>
      ) : (
        <h3 className="text-center bg-secondary">
          Sorry, No Employees At this time
        </h3>
      )}
    </div>
  );
};

export default Home;
