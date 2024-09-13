import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSuggestedUsers } from "@/redux/authSlice.js";
const useGetSuggestedUsers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/user/suggested",
          {
            withCredentials: true,
          }
        );

        console.log(res);
        if (res.data.success) {
          console.log(res);
          dispatch(setSuggestedUsers(res.data.suggestedUsers));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSuggestedUsers();
  }, []);
};

export default useGetSuggestedUsers;
