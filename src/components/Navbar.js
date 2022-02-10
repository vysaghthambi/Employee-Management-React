import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isHome =
    location.pathname.includes("add") || location.pathname.includes("edit");

  return (
    <nav className="navbar navbar-primary navbar-fixed-top shadow-sm bg-light">
      <div className="navbar-header ms-3">
        <Link className="navbar-brand text-black" to="">
          Employee Management
        </Link>
      </div>
      {!isHome && (
        <div>
          <Link className="btn btn-primary navbar-btn me-5" to="/add">
            Add Employee
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
