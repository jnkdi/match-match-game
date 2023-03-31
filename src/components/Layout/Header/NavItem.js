const NavItem = (props) => {
  return (
    <li className='nav__item'>
      <img src={props.src} alt='icon'/>
      <p>{props.title}</p>
    </li>
  )
}

export default NavItem;