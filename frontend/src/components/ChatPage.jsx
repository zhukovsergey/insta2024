import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useDispatch } from "react-redux";
import { setSelectedUser } from "@/redux/authSlice";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { MessageCircleCode } from "lucide-react";

import axios from "axios";
import { setMessages } from "@/redux/chatSlice.js";
import Messages from "./Messages";
const ChatPage = () => {
  const [textMessage, setTextMessage] = useState("");
  const { suggestedUsers, selectedUser, user } = useSelector(
    (store) => store.auth
  );
  const { onlineUsers, messages } = useSelector((store) => store.chat);
  const dispatch = useDispatch();

  const sendMessagehandler = async (receiverId) => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/message/send/${receiverId}`,
        {
          message: textMessage,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setMessages([...messages, res.data.newMessage]));
        setTextMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    return () => {
      dispatch(setSelectedUser(null));
    };
  }, []);
  return (
    <div className="flex ml-[16%] h-screen">
      <section className="w-full md:w-1/4 my-8">
        <h1 className="font-bold mb-4 px-3 text-xl">{user?.username}</h1>
        <hr className="mb-4 border-gray-300" />
        <div className="overflow-y-auto h-[80vh]">
          {suggestedUsers?.map((suggestedUser) => {
            return (
              <div
                onClick={() => dispatch(setSelectedUser(suggestedUser))}
                className="flex gap-3 items-center p-3 hover:bg-gray-50 cursor-pointer"
              >
                <Avatar className="w-14 h-14">
                  <AvatarImage
                    src={`http://localhost:8000${suggestedUser.profilePicture}`}
                  ></AvatarImage>
                  <AvatarFallback>
                    {suggestedUser.username.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">{suggestedUser.username}</span>
                  <span
                    className={`text-xs ${
                      onlineUsers?.includes(suggestedUser?._id)
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {onlineUsers?.includes(suggestedUser?._id)
                      ? "Online"
                      : "Offline"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      {selectedUser ? (
        <section className="flex-1 border-l border-l-gray-300 flex flex-col h-full">
          <div className="flex gap-3 items-center px-3 py-2 border-b border-gray-300 sticky top-0 bg-white z-10">
            <Avatar>
              <AvatarImage
                src={`http://localhost:8000${selectedUser?.profilePicture}`}
              ></AvatarImage>
              <AvatarFallback>
                {selectedUser?.username.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span>{selectedUser?.username}</span>
            </div>
          </div>
          <Messages selectedUser={selectedUser} />
          <div className="flex items-center p-4 border-t border-t-gray-300">
            <Input
              type="text"
              value={textMessage}
              onChange={(e) => setTextMessage(e.target.value)}
              className="flex-1 mr-2 focus-visible:ring-transparent"
              placeholder="Сообщение"
            />
            <Button
              onClick={(e) => sendMessagehandler(selectedUser._id)}
              className="bg-[#0095F6] h-8 hover:bg-[#076aac] rounded"
            >
              Отправить
            </Button>
          </div>
        </section>
      ) : (
        <div className="flex flex-col items-center justify-center mx-auto">
          <MessageCircleCode className="w-32 h-32 my-4" />
          <h1 className="font-medium">Ваши сообщения</h1>
          <span>Отправьте сообщение для начала переписки</span>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
