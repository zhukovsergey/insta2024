import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Comment = ({ comment }) => {
  return (
    <div className="my-2">
      <div className="flex gap-3 items-center">
        <Avatar>
          <AvatarImage src={comment?.author?.profilePicture} alt="author_img" />
          <AvatarFallback>
            {comment?.author?.username.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <h2 className="font-bold text-sm">
          {comment?.author?.username}:
          <span className="font-normal pl-1">{comment?.text}</span>
        </h2>
      </div>
    </div>
  );
};

export default Comment;
