import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserByUsername } from "../services/firebase";
// import ROUTES from "../constants/routes";
import * as ROUTES from "../constants/routes";
import Header from "../components/header";
import UserProfile from "../components/profile/";

export default function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    async function checkUserExists() {
      console.log("checkUserExists called");

      const [user] = await getUserByUsername(username);
      if (user?.userId) {
        setUser(user);
      } else {
        history.push(ROUTES.NOT_FOUND);
      }
    }
    checkUserExists();
  }, [username, history]);

  return user?.username ? (
    <div className="bg-gray-background">
      <Header username={user.username} profile={true} />
      <div className="pt-20 min-h-full mx-auto max-w-screen-lg">
        <UserProfile user={user} />
      </div>
    </div>
  ) : (
    <></>
  );
}
