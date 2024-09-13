import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const Context = createContext(null);

const useAppContext = () => {
  return useContext(Context);
};

const ContextProvider = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);
  // region checkboxes
  const [selectedItems, setSelectedItems] = useState(
    JSON.parse(localStorage.getItem("regions")) || []
  );
  const [priceRange, setPriceRange] = useState({
    from: JSON.parse(localStorage.getItem("priceRange"))?.from || "",
    to: JSON.parse(localStorage.getItem("priceRange"))?.to || "",
  });
  const [areaRange, setAreaRange] = useState({
    from: JSON.parse(localStorage.getItem("areaRange"))?.from || "",
    to: JSON.parse(localStorage.getItem("areaRange"))?.to || "",
  });
  const [bedrooms, setBedrooms] = useState(
    Number(localStorage.getItem("bedrooms")) || 0
  );

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

  const values = {
    setBaseURL,
    api,
    openModal,
    setOpenModal,
    selectedItems,
    setSelectedItems,
    priceRange,
    setPriceRange,
    areaRange,
    setAreaRange,
    bedrooms,
    setBedrooms,
  };
  return <Context.Provider value={values}>{children}</Context.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export { ContextProvider, useAppContext };
