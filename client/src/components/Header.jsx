import { NavLink } from "react-router";
function Logout() {
  console.log(localStorage.getItem("token"));
  localStorage.removeItem("token");
  console.log(localStorage.getItem("token"));
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
          Get contact
        </NavLink>
        <button onClick={Logout}>
          Logout
        </button>
      </nav>
    </>
  )
}
export default Header
