import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import useGetUserProfile from "@/hooks/useGetUserProfile";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { AtSign, Heart, MessageCircle } from "lucide-react";

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);
  const [activeTab, setActiveTab] = useState("posts");

  const { userProfile, user } = useSelector((store) => store.auth);

  const isLoggedInUserProfile = user?._id === userProfile?._id;
  const isFollowing = false;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  console.log(userProfile);
  const displayedPost =
    activeTab === "posts" ? userProfile?.posts : userProfile?.bookmarks;
  return (
    <div className="flex max-w-5xl justify-center mx-auto pl-10">
      <div className="flex flex-col gap-20 p-8">
        <div className="grid grid-cols-2">
          <section className="flex items-center justify-center">
            <Avatar className="h-32 w-32">
              <AvatarImage
                src={`http://localhost:8000${userProfile?.profilePicture}`}
                alt="avatar"
              />
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
                    <Link to="/account/edit">
                      <Button
                        className="hover:bg-gray-200 h-8"
                        variant="secondary"
                      >
                        Редактировать
                      </Button>
                    </Link>

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
            <div className="grid grid-cols-3 gap-1">
              {displayedPost?.map((post) => {
                return (
                  <div
                    key={post?._id}
                    className="relative group cursor-pointer"
                  >
                    <img
                      className="rounded-xl my-2 w-full aspect-square object-cover"
                      src={"http://localhost:8000" + post.image}
                      alt="post_image rounded-md"
                    />
                    <div className="rounded-xl m-1 absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center text-white space-x-4">
                        <button className="flex items-center gap-2 hover:text-gray-300">
                          <Heart />
                          <span>{post?.likes.length}</span>
                        </button>
                        <button className="flex items-center gap-2 hover:text-gray-300">
                          <MessageCircle />
                          <span>{post?.likes.length}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
