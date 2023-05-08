const SettingsItem = (props) => {
  const changeParamHandler = (e) => {
    if (props.param === "amount") {
      props.setCardsAmount(e.target.value);
    } else if (props.param === "set") {
      props.setCardsSet(e.target.value);
    }
  };

  return (
    <div className={props.className}>
      <label htmlFor={props.title} className="settings__title">
        {props.title}
      </label>
      <select
        id={props.title}
        onChange={changeParamHandler}
        value={props.param === "amount" ? props.cardsAmount : props.cardsSet}
      >
        {props.options.map((option) => (
          <option value={option.value} key={Math.random().toString()}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SettingsItem;
