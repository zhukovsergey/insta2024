import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { MoreHorizontal, MessageCircle, Send, Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from "./CommentDialog";

const Post = () => {
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
            <AvatarImage src="" alt="post_image" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1>username</h1>
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
            <Button variant="ghost" className="cursor-pointer w-fit font-bold ">
              Удалить
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      <img
        className="rounded-sm my-2 w-full aspect-square object-cover"
        src="https://core-pht-proxy.maps.yandex.ru/v1/photos/download?photo_id=9GYkB9hP7cjOM81tfqXdgA&image_size=L"
        alt=""
        srcset=""
      />

      <div className="flex items-center justify-between my-2">
        <div className="flex items-center gap-3">
          <FaRegHeart
            size={"22px"}
            className="cursor-pointer hover:text-gray-600"
          />
          <MessageCircle
            onClick={() => setOpen(true)}
            className="cursor-pointer hover:text-gray-600"
          />
          <Send className="cursor-pointer hover:text-gray-600" />
        </div>
        <Bookmark className="cursor-pointer hover:text-gray-600" />
      </div>
      <span className="font-medium block mb-2">1k likes</span>
      <p>
        <span className="font-medium">username</span> caption
      </p>
      <span
        onClick={() => setOpen(true)}
        className="cursor-pointer text-sm text-gray-400"
      >
        View all 10 comments
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
        {text && <span className="text-[#38ADF8]">POST</span>}
      </div>
    </div>
  );
};

export default Post;
