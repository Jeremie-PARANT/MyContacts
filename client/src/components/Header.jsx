import { NavLink } from "react-router";
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
      </nav>
    </>
  )
}
export default Header
