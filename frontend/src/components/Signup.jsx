import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const [loading, setLoading] = useState(false);

  const sugnupHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
        console.log(res);
        setInput({
          username: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center w-screen h-screen justify-center ">
      <form
        onSubmit={sugnupHandler}
        action=""
        className="shadow-lg flex flex-col gap-5 p-8"
      >
        <div className="my-4">
          <h1 className="text-center font-bold text-xl">Logo</h1>
          <p className="text-sm text-center">
            Зарегистрируйтесь для просмотра фото и видео
          </p>
        </div>
        <div>
          <span className="py-1 font-medium">Имя пользователя</span>
          <Input
            id="username"
            value={input.username}
            type="text"
            onChange={changeEventHandler}
            name="username"
            className="focus-visible:ring-transparent my-2"
          />
        </div>
        <div>
          <span className="py-1 font-medium">Email</span>
          <Input
            id="email"
            value={input.email}
            type="email"
            name="email"
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent my-2"
          />
        </div>
        <div>
          <span className="py-1 font-medium">Пароль</span>
          <Input
            id="password"
            value={input.password}
            type="text"
            name="password"
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent my-2"
          />
        </div>
        {loading ? (
          <Button>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Подождите...
          </Button>
        ) : (
          <Button type="submit">Войти</Button>
        )}

        <span className="text-center">
          У вас уже есть аккаунт?{" "}
          <Link to="/login" className="text-blue-500">
            Войдите
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
