import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SuggestedUsers from "./SuggestedUsers";

const RightSidebar = () => {
  const { user } = useSelector((store) => store.auth);
  const { post } = useSelector((store) => store.post);
  return (
    <div className="w-fit my-10 pr-24">
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
          <span className="text-gray-600 text-sm">{user?.bio || "О себе"}</span>
        </div>
      </div>
      <SuggestedUsers />
    </div>
  );
};

export default RightSidebar;
