import React from "react";
import "./Filters.css";
import { CloseOutlined } from "@ant-design/icons";
import { useAppContext } from "../../context/ContextProvider";
import m2Icon from "/m2-icon.png";

const Filters = () => {
  const {
    selectedItems,
    setSelectedItems,
    priceRange,
    setPriceRange,
    areaRange,
    setAreaRange,
    bedrooms,
    setBedrooms,
  } = useAppContext();

  // display price filters as needed
  const handlePriceFilter = () => {
    if (priceRange.from !== "" && priceRange.to !== "") {
      return (
        <FilterWrapper
          price
          value={`${priceRange.from} ₾ - ${priceRange.to} ₾`}
        />
      );
    } else if (priceRange.from !== "" && priceRange.to === "") {
      return <FilterWrapper price value={`${priceRange.from} ₾`} />;
    } else if (priceRange.from === "" && priceRange.to !== "") {
      return <FilterWrapper price value={`0 ₾ - ${priceRange.to} ₾`} />;
    }
  };

  // display area filters as needed
  const handleAreaFilter = () => {
    if (areaRange.from !== "" && areaRange.to !== "") {
      return (
        <FilterWrapper area value={`${areaRange.from} - ${areaRange.to}`} />
      );
    } else if (areaRange.from !== "" && areaRange.to === "") {
      return <FilterWrapper area value={`${areaRange.from}`} />;
    } else if (areaRange.from === "" && areaRange.to !== "") {
      return <FilterWrapper area value={`0 - ${areaRange.to}`} />;
    }
  };

  // delete every filter
  const deleteEveryFilter = () => {
    setSelectedItems([]);
    setPriceRange({
      from: "",
      to: "",
    });
    setAreaRange({
      from: "",
      to: "",
    });
    setBedrooms(0);
    localStorage.removeItem("regions");
    localStorage.removeItem("priceRange");
    localStorage.removeItem("areaRange");
    localStorage.removeItem("bedrooms");
  };

  return (
    <div className="filter-container">
      {selectedItems.map((item) => (
        <FilterWrapper value={item} regions />
      ))}
      {handlePriceFilter()}
      {handleAreaFilter()}
      {bedrooms > 0 && <FilterWrapper bedrooms value={bedrooms} />}
      {selectedItems.length > 0 ||
      priceRange.from !== "" ||
      priceRange.to !== "" ||
      areaRange.from !== "" ||
      areaRange.to !== "" ||
      bedrooms != "" ? (
        <span
          onClick={deleteEveryFilter}
          style={{
            fontFamily: "firago-medium",
            border: "none",
            cursor: "pointer",
          }}
          className="filter-wrapper"
        >
          გასუფთავება
        </span>
      ) : null}
    </div>
  );
};

const FilterWrapper = ({ value, area, regions, price, bedrooms }) => {
  const {
    setSelectedItems,
    selectedItems,
    setPriceRange,
    setAreaRange,
    setBedrooms,
  } = useAppContext();
  return (
    <div className="filter-wrapper">
      <span>{value}</span>
      {area && <img src={m2Icon} />}
      <CloseOutlined
        onClick={() => {
          if (regions) {
            const updatedSelectedItems = selectedItems.filter(
              (item) => item !== value
            );
            setSelectedItems(updatedSelectedItems);
            localStorage.setItem(
              "regions",
              JSON.stringify(updatedSelectedItems)
            );
          } else if (price) {
            setPriceRange({ from: "", to: "" });
            localStorage.removeItem("priceRange");
          } else if (area) {
            setAreaRange({ from: "", to: "" });
            localStorage.removeItem("areaRange");
          } else if (bedrooms) {
            setBedrooms(0);
            localStorage.removeItem("bedrooms");
          }
        }}
      />
    </div>
  );
};

export default Filters;
