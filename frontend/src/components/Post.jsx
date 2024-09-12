import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { MoreHorizontal, MessageCircle, Send, Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from "./CommentDialog";

const Post = ({ post }) => {
  const [postLike, setPostLike] = useState(post.likes.length);
  const { user } = useSelector((store) => store.auth);
  const [liked, setLiked] = useState(post.likes.includes(user._id) || false);

  const { posts } = useSelector((store) => store.post);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim().length > 0) {
      setText(inputText);
    } else {
      setText("");
    }
  };
  return (
    <div className="my-8 w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={post.author?.profilePicture} alt="post_image" />
            <AvatarFallback>
              {post.author?.username?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <h1>{post.author?.username}</h1>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center text-sm text-center">
            <Button
              variant="ghost"
              className="cursor-pointer w-fit text-[#ED4956] font-bold"
            >
              Отписаться
            </Button>
            <Button variant="ghost" className="cursor-pointer w-fit ">
              Добавить в избранное
            </Button>
            {user?._id === post.author?._id && (
              <Button
                onClick={() => deletePostHandler(post._id)}
                variant="ghost"
                className="cursor-pointer w-fit font-bold "
              >
                Удалить
              </Button>
            )}
          </DialogContent>
        </Dialog>
      </div>
      <img
        className="rounded-sm my-2 w-full aspect-square object-cover"
        src={"http://localhost:8000" + post.image}
        alt=""
        srcSet=""
      />

      <div className="flex items-center justify-between my-2">
        <div className="flex items-center gap-3">
          <FaRegHeart
            size={"22px"}
            className="cursor-pointer hover:text-gray-600"
          />
          <MessageCircle
            onClick={() => {
              dispatch(setSelectedPost(post));
              setOpen(true);
            }}
            className="cursor-pointer hover:text-gray-600"
          />
          <Send className="cursor-pointer hover:text-gray-600" />
        </div>
        <Bookmark className="cursor-pointer hover:text-gray-600" />
      </div>
      <span className="font-medium block mb-2">{postLike} лайков</span>
      <p>
        <span className="font-medium">{post.author?.username} </span>
        {post?.caption}
      </p>
      <span
        onClick={() => {
          dispatch(setSelectedPost(post));
          setOpen(true);
        }}
        className="cursor-pointer text-sm text-gray-400"
      >
        Посмотреть все комментарии {comment.length}
      </span>
      <CommentDialog open={open} setOpen={setOpen} />
      <div className="flex">
        <input
          type="text"
          value={text}
          placeholder="Добавить комментарий"
          onChange={changeEventHandler}
          className="outline-none text-sm w-full"
        />
        {text && (
          <span
            onClick={commentHandler}
            className="text-[#38ADF8] cursor-pointer"
          >
            POST
          </span>
        )}
      </div>
    </div>
  );
};

export default Post;
