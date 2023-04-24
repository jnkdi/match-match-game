import "./Settings.scss";
import Card from "../UI/Card";
import SettingsItem from "./SettingsItem";

const Settings = (props) => {
  const settingsItems = [
    {
      id: Math.random().toString(),
      title: "Game cards",
      options: [
        { value: "retro", label: "Retro" },
        { value: "fastfood", label: "Fastfood" },
        { value: "UFO", label: "UFO" },
      ],
      param: "set",
    },
    {
      id: Math.random().toString(),
      title: "Difficulty",
      options: [
        { value: 16, label: "16" },
        { value: 20, label: "20" },
        { value: 36, label: "36" },
      ],
      param: "amount",
    },
  ];

  return (
    <Card className="settings">
      <div className="settings__items">
        {settingsItems.map((item) => (
          <SettingsItem
            title={item.title}
            options={item.options}
            key={item.id}
            param={item.param}
            className="settings__item"
            setCardsSet={props.setCardsSet}
            setCardsAmount={props.setCardsAmount}
            cardsSet={props.cardsSet}
            cardsAmount={props.cardsAmount}
          />
        ))}
      </div>
    </Card>
  );
};

export default Settings;
