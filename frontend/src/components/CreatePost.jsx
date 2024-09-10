import React from "react";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const CreatePost = ({ open, setOpen }) => {
  const createPostHandler = (e) => {
    e.preventDefault();
    try {
    } catch (error) {}
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className="text-center font-semibold">
          Создание новой записи
        </DialogHeader>
        <div className="flex gap-3 items-center ">
          <Avatar>
            <AvatarImage src="" alt="img" />
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-semibold text-xs">Username</h1>
            <span className="text-gray-600 text-xs">Bio Here...</span>
          </div>
        </div>
        
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
