import { RouterProvider } from "react-router-dom";
import router from "./router";
import { useDispatch } from "react-redux";
import { get } from "./utils/LocalStorage";
import { useEffect } from "react";
import { addUserInfo } from "./features/services/auth/authSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userInfo = get("userInfo");
    if (userInfo) {
      dispatch(addUserInfo(JSON.parse(userInfo)));
    }
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
