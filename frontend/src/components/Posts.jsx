import React from "react";
import Post from "./Post";

const Posts = () => {
  return (
    <div>
      {[1, 2, 3, 4].map((item, index) => (
        <div>
          <Post key={index} />
        </div>
      ))}
    </div>
  );
};

export default Posts;
