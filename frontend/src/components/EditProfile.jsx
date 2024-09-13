import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSelector } from "react-redux";

const EditProfile = () => {
  const { user } = useSelector((store) => store.auth);
  return (
    <div className="flex max-w-5xl justify-center mx-auto pl-10">
      <section className="flex flex-col gap-5">
        <h1 className="font-bold text-xl">Редактирование профиля</h1>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={user?.profilePicture} />
            <AvatarFallback>{user?.username.slice(0, 2)}</AvatarFallback>
          </Avatar>

          <div>
            <h1>{user?.username}</h1>
            <p>{user?.bio}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditProfile;
