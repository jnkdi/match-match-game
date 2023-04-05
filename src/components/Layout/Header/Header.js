import { Link } from 'react-router-dom';
import Nav from './Nav';
import Button from '../../UI/Button';
import './Header.scss';
import about from '../../../assets/header/about-icon.svg';
import best from '../../../assets/header/best-score-icon.svg';
import settings from '../../../assets/header/settings-icon.svg';

const Header = (props) => {

  const navItems = [
    {
      id: Math.random().toString(),
      src: about,
      title: 'About Game',
      href: '/about-game',
    },
    {
      id: Math.random().toString(),
      src: best,
      title: 'Best Score',
      href: '/best-score',
    },
    {
      id: Math.random().toString(),
      src: settings,
      title: 'Game Settings',
      href: '/settings',
    },
  ]

  console.log(props);

  return (
    <header className='header'>
      <div className='header__logo'>
        <p>match</p>
        <p>match</p>
      </div>
      <Nav navItems={navItems}/>
      {!props.isRegistered && <Button onClick={props.onOpenRegister} className='header__button'>register new player</Button>}
      {props.isRegistered && !props.isGameOn && <Button onClick={props.onStartGame} className='header__button'><Link to='/game'>start game</Link></Button>}
      {props.isGameOn && <Button onClick={props.onStopGame} className='header__button'>stop game</Button>}
    </header>
  )
}

export default Header;