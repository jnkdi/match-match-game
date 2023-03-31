import Card from "../UI/Card";

const Rule = (props) => {
  return(
    <div className='rules__rule rule'>
      <Card className='rule__descriprion-card'>
        <div className='rule__descriprion'>
          <div className='rule__number'>{props.id}</div>
          <div className='rule__content'>{props.content}</div>
        </div>
      </Card>
      <div className='rule__img'>
        <img src={props.src} alt='rule example'/>
      </div>
    </div>
  )
}

export default Rule;