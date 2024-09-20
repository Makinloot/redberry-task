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
    Number(localStorage.getItem("bedrooms")) || ""
  );

  // authorization for api calls
  const api = axios.create({
    headers: {
      Authorization: `Bearer 9d0c8687-e572-47cb-9813-397d55e25e4e`,
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

export { ContextProvider, useAppContext };
