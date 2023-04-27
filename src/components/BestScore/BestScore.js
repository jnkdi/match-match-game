import { useState, useEffect } from "react";
import "./BestScore.scss";
import { db } from "../../firebase";
import { getDocs, collection } from "firebase/firestore";
import Card from "../UI/Card";
import User from "./User";

const BestScore = (props) => {
  const [usersList, setUsersList] = useState([]);

  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const getUsersList = async () => {
      try {
        const data = await getDocs(usersCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUsersList(filteredData);
      } catch (err) {
        console.log(err);
      }
    };

    getUsersList();
  }, [props.userKey, props.avatarUrl]);

  return (
    <Card className="best-players">
      <h2 className="best-players__title">Best players</h2>
      {usersList
        .sort((a, b) => +b.score - +a.score)
        .map((user) => (
          <User
            image={
              user.image ||
              "https://firebasestorage.googleapis.com/v0/b/match-match-game-9501e.appspot.com/o/images%2Falien.png?alt=media&token=aff509f7-d3c4-4dfb-ab44-58c1e485cd5b"
            }
            name={user.name}
            score={user.score || "0"}
            key={user.id}
          ></User>
        ))}
    </Card>
  );
};

export default BestScore;
