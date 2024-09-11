import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const Context = createContext(null);

const useAppContext = () => {
  return useContext(Context);
};

const ContextProvider = ({ children }) => {
  // authorization for api calls
  const api = axios.create({
    headers: {
      Authorization: `Bearer 9cfc227b-ce5f-487d-a2cb-55f0028470ef`,
    },
  });
  // function to dinamically set urls for api calls
  const setBaseURL = (url) => {
    api.defaults.baseURL = url;
  };

  const values = { setBaseURL, api };
  return <Context.Provider value={values}>{children}</Context.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export { ContextProvider, useAppContext };
