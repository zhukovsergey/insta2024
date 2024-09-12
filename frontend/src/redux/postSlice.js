import { createSlice } from "@reduxjs/toolkit";
const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
<<<<<<< HEAD
    selectedPost: null,
=======
>>>>>>> 976d9f8b94fc195d3520a860a6d9ff83471f8b91
  },
  reducers: {
    //actions
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
<<<<<<< HEAD
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
  },
});
export const { setPosts, setSelectedPost } = postSlice.actions;
=======
  },
});
export const { setPosts } = postSlice.actions;
>>>>>>> 976d9f8b94fc195d3520a860a6d9ff83471f8b91
export default postSlice.reducer;
