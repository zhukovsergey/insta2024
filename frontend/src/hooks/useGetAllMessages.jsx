import { setMessages } from "@/redux/chatSlice.js";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllMessages = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.auth);
  useEffect(() => {
    const fetchAllMessage = async () => {
      try {
        console.log(selectedUser?._id);
        const res = await axios.get(
          `http://localhost:8000/api/v1/message/all/${selectedUser?._id}`,
          { withCredentials: true }
        );
        console.log(res.data);
        if (res.data.success) {
          dispatch(setMessages(res.data.messages));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllMessage();
  }, [selectedUser]);
};
export default useGetAllMessages;
