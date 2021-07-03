import useUser from "../../hooks/use-user";
import User from "./user";
import Suggestions from "./suggestions";
import { useState } from "react";

export default function Sidebar() {
  // const {
  //   user: { fullName, username, userId },
  // } = useUser();
  const { user } = useUser();
  return (
    <div className="p-4">
      {/* <User /> */}
      {/* <Suggestions /> */}

      <User username={user?.username} fullName={user?.fullName} />
      <Suggestions userId={user?.userId} following={user?.following} />
    </div>
  );
}
