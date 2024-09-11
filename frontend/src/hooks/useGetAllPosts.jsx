import { useEffect } from "react";
import { setPosts } from "../redux/postSlice.js";
import axios from "axios";
import { useDispatch } from "react-redux";
const useGetAllPosts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/post/all", {
          withCredentials: true,
        });

        console.log(res);
        if (res.data.success) {
          console.log(res.data.post);
          dispatch(setPosts(res.data.post));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllPosts();
  }, []);
};

export default useGetAllPosts;
