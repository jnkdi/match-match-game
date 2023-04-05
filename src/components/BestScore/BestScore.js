import { useState, useEffect, Fragment } from "react";
import "./BestScore.scss";
import { db } from "../../firebase";
import { getDocs, collection } from "firebase/firestore";
import Card from "../UI/Card";
import User from "./User";

const BestScore = () => {
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
  }, []);

  return (
    <Card className="best-players">
      <h2 className="best-players__title">Best players</h2>
      {usersList.map((user) => (
        <User
          url={user.userData.URL}
          name={user.userData.name}
          score={user.userData.score || "0"}
          key={user.id}
        ></User>
      ))}
    </Card>
  );
};

export default BestScore;
