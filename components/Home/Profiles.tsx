import { populateUsers } from "@/libs/actions/user.actions";
import { User } from "@clerk/nextjs/server";
import React from "react";

type ProfilesProps = {};

const Profiles: React.FC<ProfilesProps> = async () => {
  const xy = await populateUsers();

  return (
    <div>
      {xy?.map((x: User) => (
        <h2 key={x.id}>{x.username}</h2>
      ))}
    </div>
  );
};
export default Profiles;
