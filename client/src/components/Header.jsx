import { NavLink } from "react-router";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.css";

function Logout() {
  localStorage.removeItem("token");
  alertify.success("Création reussi");
}

function Header() {
  return (
    <>
      <nav>
        <NavLink to="/" className={({ isActive }) => isActive ? "active" : "" }>
          Login
        </NavLink>
        <NavLink to="/register" className={({ isActive }) => isActive ? "active" : ""}>
          Register
        </NavLink>
        <NavLink to="/contact/create" className={({ isActive }) => isActive ? "active" : ""}>
          Create contact
        </NavLink>
        <NavLink to="/contact/get" className={({ isActive }) => isActive ? "active" : ""}>
          Get contacts
        </NavLink>
        <NavLink to="/contact/update" className={({ isActive }) => isActive ? "active" : ""}>
          Update contact
        </NavLink>
        <button onClick={Logout}>
          Logout
        </button>
      </nav>
    </>
  )
}
export default Header
