import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { useRef } from "react";
import { Textarea } from "./ui/textarea";
import axios from "axios";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const EditProfile = () => {
  const imageRef = useRef();

  const { user } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    profilePicture: user?.profilePicture,
    bio: user?.bio,
    gender: user?.gender,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setInput({ ...input, profilePicture: file });
    }
  };
  const selectChangeHandler = (value) => {
    setInput({ ...input, gender: value });
  };

  const editProfileHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profilePicture", input.profilePicture);
    formData.append("bio", input.bio);
    formData.append("gender", input.gender);
    formData.append("userId", user?._id);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/v1/user//profile/edit",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setLoading(false);
        toast.success(res.data.message);

        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex max-w-2xl justify-center mx-auto pl-10">
      <section className="flex flex-col gap-5 w-full">
        <h1 className="font-bold text-xl">Редактирование профиля</h1>
        <div className="flex items-center bg-gray-100 justify-between rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user?.profilePicture} />
              <AvatarFallback>{user?.username.slice(0, 2)}</AvatarFallback>
            </Avatar>

            <div>
              <h1>{user?.username}</h1>
              <p>{user?.bio}</p>
            </div>
          </div>
          <input
            type="file"
            className="hidden"
            ref={imageRef}
            onChange={fileChangeHandler}
          />
          <Button
            onClick={() => imageRef.current.click()}
            className="bg-[#0095F6] h-8 hover:bg-[#076aac]"
          >
            Изменить фото
          </Button>
        </div>
        <div>
          <h1 className="font-bold text-xl mb-2">Bio</h1>
          <Textarea
            value={input.bio}
            name="bio"
            onChange={(e) => setInput({ ...input, bio: e.target.value })}
            className="focus-visible:ring-transparent"
          />
        </div>
        <div>
          <h1 className="font-bold text-xl mb-2">Пол</h1>
          <Select
            onValueChange={selectChangeHandler}
            defaultValue={input.gender}
          >
            <SelectTrigger className="focus-visible:ring-transparent w-[180px]">
              <SelectValue placeholder="Выберите пол" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Мужской">Мужской</SelectItem>
                <SelectItem value="Женский">Женский</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end">
          {loading ? (
            "Загрузка..."
          ) : (
            <Button
              onClick={editProfileHandler}
              className="w-fit bg-[#0095F6] hover:bg-[#076aac]"
            >
              Сохранить
            </Button>
          )}
        </div>
      </section>
    </div>
  );
};

export default EditProfile;
