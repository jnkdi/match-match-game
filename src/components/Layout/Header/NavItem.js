import { NavLink } from "react-router-dom";

const NavItem = (props) => {
  return (
    <li>
      <NavLink className="nav__item" to={props.href}>
        <img src={props.src} alt="icon" />
        <p>{props.title}</p>
      </NavLink>
    </li>
  );
};

export default NavItem;
