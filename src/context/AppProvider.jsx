import { useMutation } from "@tanstack/react-query";
import { createContext, useReducer, useState } from "react";
import reducer from "../reducer/reducer";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const AppContext = createContext();

const defaultState = {
  snippets: [],
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfoLS") || "{}")
  );

  axios.defaults.headers.common["Authorization"] = `Bearer ${
    userInfo?.data?.access_token || null
  }`;

  return (
    <AppContext.Provider value={{ userInfo, setUserInfo, state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider };

export default AppContext;
