import NavItem from "./NavItem";

const Nav = (props) => {
  return (
    <nav className={"header__nav nav "}>
      <ul className="nav__items">
        {props.navItems.map((item) => (
          <NavItem
            title={item.title}
            src={item.src}
            href={item.href}
            key={item.id}
            onClick={props.stopGame}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
