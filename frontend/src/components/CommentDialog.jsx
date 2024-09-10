import React from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const CommentDialog = ({ open, setOpen }) => {
  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={() => setOpen(false)}>
        <div className="flex flex-1">
          <div className="w-1/2">
            <img
              src="https://core-pht-proxy.maps.yandex.ru/v1/photos/download?photo_id=9GYkB9hP7cjOM81tfqXdgA&image_size=L"
              alt=""
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          <div className="w-1/2 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <Avatar>
                <AvatarImage src="" alt="post_image" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
