import Rule from "./Rule";

const Rules = (props) => {
  return (
  <div className='about-game__rules rules'>
    {props.rules.map((rule) => (
      <Rule id={rule.id} content={rule.content} src={rule.src}></Rule>
    ))}
  </div>
  )
}

export default Rules;