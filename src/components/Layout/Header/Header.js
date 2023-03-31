// import { useNavigate } from "react-router-dom";
import Nav from './Nav';
import './Header.scss';
import about from '../../../assets/header/about-icon.svg';
import best from '../../../assets/header/best-score-icon.svg';
import settings from '../../../assets/header/settings-icon.svg';
const Header = () => {
  // const routeChange = () => {

  // }

  const navItems = [
    {
      id: Math.random().toString(),
      src: about,
      title: 'About Game',
    },
    {
      id: Math.random().toString(),
      src: best,
      title: 'Best Score',
    },
    {
      id: Math.random().toString(),
      src: settings,
      title: 'Game Settings',
    },
  ]

  return (
    <header className='header'>
      <div className='header__logo'>
        <p>match</p>
        <p>match</p>
      </div>
      <Nav navItems={navItems}/>
      <button className='header__button'>register new player</button>
    </header>
  )
}

export default Header;