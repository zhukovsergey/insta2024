import { browser } from "globals";
import Signup from "./components/Signup";
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./components/Home";
import MainLayout from "./components/MainLayout";
import Login from "./components/Login";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
      {
        path: "/account/edit",
        element: <EditProfile />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
