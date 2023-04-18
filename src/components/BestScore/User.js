import './User.scss';
// import userImage from './test-avatar.jpg';

const User = (props) => {
  return (
    <div className='user'>
      <div className='user__profile'>
        <img className='user__img' src={props.image} alt='avatar'/>
        <p>{props.name}</p>
      </div>
      <p className='user__score'>Score: <span>{props.score}</span></p>
    </div>
  )
}

export default User;