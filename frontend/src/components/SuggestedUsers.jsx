import React from "react";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";

const SuggestedUsers = () => {
  const { suggestedUsers } = useSelector((store) => store.auth);
  return (
    <div className="my-10">
      <div className="flex items-center justify-between text-sm">
        <h1 className="font-semibold text-gray-600">
          Предлагаем подписаться на:
        </h1>
        <span className="font-medium cursor-pointer"> Посмотреть все...</span>
      </div>

      {suggestedUsers?.map((user) => {
        return (
          <div
            key={user._id}
            className="flex items-center justify-between my-5"
          >
            <div className="flex items-center gap-2">
              <Link to={`/profile/${user?._id}`}>
                <Avatar>
                  <AvatarImage src={user.profilePicture} alt="post_image" />
                  <AvatarFallback>{user.username?.slice(0, 2)}</AvatarFallback>
                </Avatar>
              </Link>

              <div className="">
                <h1 className="font-semibold text-sm">
                  <Link to={`/profile/${user?._id}`}>{user?.username}</Link>
                </h1>
                <span className="text-gray-600 text-sm">
                  {user?.bio || "О себе"}
                </span>
              </div>
            </div>
            <span className="text-[#3BADF8] text-xs font-bold cursor-pointer hover:text-[#1686d1]">
              Подписаться
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default SuggestedUsers;
