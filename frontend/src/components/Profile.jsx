import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import useGetUserProfile from "@/hooks/useGetUserProfile";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { AtSign } from "lucide-react";

const Profile = () => {
  const params = useParams();
  const [activeTab, setActiveTab] = useState("posts");
  const userId = params.id;
  useGetUserProfile(userId);
  const { userProfile } = useSelector((store) => store.auth);
  const isLoggedInUserProfile = false;
  const isFollowing = true;
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="flex max-w-5xl justify-center mx-auto pl-10">
      <div className="flex flex-col gap-20 p-8">
        <div classname="grid grid-cols-2 gap-4">
          <div class="grid grid-cols-2 gap-4">
            <section className="flex items-center justify-center">
              <Avatar className="h-32 w-32">
                <AvatarImage src={userProfile?.profilePicture} alt="avatar" />
                <AvatarFallback>
                  {userProfile?.username?.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </section>
            <section>
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-2">
                  <span>{userProfile?.username}</span>
                  {isLoggedInUserProfile ? (
                    <>
                      <Button
                        className="hover:bg-gray-200 h-8"
                        variant="secondary"
                      >
                        Редактировать
                      </Button>
                      <Button
                        className="hover:bg-gray-200 h-8"
                        variant="secondary"
                      >
                        Просмотр архива
                      </Button>
                      <Button
                        className="hover:bg-gray-200 h-8"
                        variant="secondary"
                      >
                        Добавить возможности
                      </Button>
                    </>
                  ) : isFollowing ? (
                    <>
                      <Button
                        className=" rounded-xl bg-gray-200 h-8"
                        variant="secondary "
                      >
                        Отписаться
                      </Button>
                      <Button
                        className="bg-[#0095F6] h-8 hover:bg-[#32aafa] rounded-xl text-white"
                        variant="secondary"
                      >
                        Сообщение
                      </Button>
                    </>
                  ) : (
                    <Button
                      className="bg-[#0095F6] h-8 hover:bg-[#32aafa] rounded-xl text-white"
                      variant="secondary"
                    >
                      Подписаться
                    </Button>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <p>
                      <span className="font-semibold">Записей всего:</span>
                      {userProfile?.posts.length}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-semibold">Подписчиков:</span>
                      {userProfile?.followers.length}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-semibold">Вы подписаны:</span>
                      {userProfile?.following.length}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold">
                    {userProfile?.bio || "Нет описания профиля"}
                  </span>
                  <Badge className="w-fit" variant="secondary">
                    <AtSign />
                    <span className="pl-1"> {userProfile?.username}</span>
                  </Badge>
                  <span>Изучение кода вместе..</span>
                  <span>Инфо..</span>
                  <span>Контакты для связи..</span>
                </div>
              </div>
            </section>
          </div>
          <div className="border-t border-t-gray-200">
            <div className="flex items-center justify-center gap-10 text-sm">
              <span
                onClick={() => handleTabChange("posts")}
                className={`py-3 cursor-pointer ${
                  activeTab === "posts" ? "border-b border-black font-bold" : ""
                }`}
              >
                ЗАПИСИ
              </span>
              <span
                onClick={() => handleTabChange("saved")}
                className={`py-3 cursor-pointer ${
                  activeTab === "saved" ? "border-b border-black font-bold" : ""
                }`}
              >
                ЗАКЛАДКИ
              </span>
              <span
                onClick={() => handleTabChange("saved")}
                className="py-3 cursor-pointer"
              >
                ВИДЕО
              </span>
              <span className="py-3 cursor-pointer">ТЕГИ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
