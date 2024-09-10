import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import {
  Home,
  Search,
  TrendingUp,
  MessageCircle,
  Heart,
  LogOut,
  PlusSquare,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { setAuthUser } from "@/redux/authSlice";
import CreatePost from "./CreatePost";

const LeftSidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout", {
        withCredentials: true,
      });
      console.log(res);
      if (res.data.success) {
        dispatch(setAuthUser(null));
        toast.success(res.data.message);
        navigate("/login");
        console.log(res);
      }
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.message);
    }
  };

  const sidebarHandler = (text) => {
    if (text === "Выйти") {
      alert(text);
      logoutHandler();
    }

    if (text === "Создать") {
      setOpen(true);
    }
  };
  const sidebarItems = [
    { icon: <Home />, text: "Главная" },
    { icon: <Search />, text: "Поиск" },
    { icon: <TrendingUp />, text: "Explore" },
    { icon: <MessageCircle />, text: "Сообщения" },
    { icon: <Heart />, text: "Уведомления" },
    { icon: <PlusSquare />, text: "Создать" },
    {
      icon: (
        <Avatar className="w-6 h-6">
          <AvatarImage src={user?.profilePicture} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      text: "Профиль",
    },
    { icon: <LogOut />, text: "Выйти" },
  ];
  return (
    <div className="fixed top-0 z-10 left-0 border-r border-gray-300 w-[16%] h-screen ">
      <div className="flex flex-col">
        <h1 className="my-8 pl-3 font-bold">LOGO</h1>
        <div>
          {sidebarItems.map((item, index) => (
            <div
              onClick={() => sidebarHandler(item.text)}
              key={index}
              className="flex items-center gap-4 p-3 relative hover:bg-gray-100
              cursor-pointer rounded-lg my-3"
            >
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
      <CreatePost open={open} setOpen={setOpen} />
    </div>
  );
};

export default LeftSidebar;
