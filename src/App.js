import Home from "./components/Home";
import Navbar from "./components/Navbar";
import EmployeeAdd from "./components/EmployeeAdd";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "./components/Axios";
import EmployeeEdit from "./components/EmployeeEdit";
import { MyContext } from "./components/MyContext";

function App() {
  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const results = await api.get("/employees");
        setEmployeeList(results.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <Router>
      <Navbar />
      <MyContext.Provider value={{ employeeList, setEmployeeList }}>
        <Routes>
          <Route path="" element={<Home />} />
          <Route
            path="/add"
            element={
              <div className="d-flex justify-content-center">
                <EmployeeAdd />
              </div>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <div className="d-flex justify-content-center">
                <EmployeeEdit />
              </div>
            }
          />
        </Routes>
      </MyContext.Provider>
    </Router>
  );
}

export default App;
