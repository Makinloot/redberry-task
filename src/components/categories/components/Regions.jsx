import { useState, useRef, useEffect } from "react";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import { Button, Checkbox, Dropdown, Menu, Space } from "antd";
import { useAppContext } from "../../../context/ContextProvider";

const Regions = () => {
  const dropdownRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [regions, setRegions] = useState([]);
  const [error, setError] = useState(null);
  const { setBaseURL, api, selectedItems, setSelectedItems } = useAppContext();

  // fetch cities
  useEffect(() => {
    const fetchCities = async () => {
      try {
        setBaseURL("https://api.real-estate-manager.redberryinternship.ge/api");
        const response = await api.get("/regions");
        // filter response by name
        const filterResponse = response.data.map((item) => item.name);
        setRegions(filterResponse);
      } catch (error) {
        setError("Error fetching cities");
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  // toggle dropdown
  const toggleDropdown = () => {
    setVisible((prevVisible) => !prevVisible);
  };

  // close dropdown if clicked outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCheckboxChange = (checkedValue) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = prevSelectedItems.includes(checkedValue)
        ? prevSelectedItems.filter((item) => item !== checkedValue)
        : [...prevSelectedItems, checkedValue];
      localStorage.setItem("regions", JSON.stringify(updatedSelectedItems));
      return updatedSelectedItems;
    });
  };

  //
  const handleConfirm = () => {
    setVisible(false);
  };

  return (
    <div>
      <div style={{ position: "relative", display: "inline-block" }}>
        <Button
          className={`category-btn ${visible ? "category-btn-active" : ""}`}
          type="text"
          onClick={toggleDropdown}
        >
          <span>რეგიონი</span>
          {visible ? (
            <UpOutlined style={{ fontSize: 13 }} />
          ) : (
            <DownOutlined style={{ fontSize: 13 }} />
          )}
        </Button>

        {visible && (
          <div ref={dropdownRef} className="options-dropdown">
            <span className="options-title">რეგიონის მიხედვით</span>
            <div className="options-wrapper">
              {regions.map((region) => (
                <div key={region}>
                  <Checkbox
                    checked={selectedItems.includes(region)}
                    onChange={() => handleCheckboxChange(region)}
                  >
                    <span className="option">{region}</span>
                  </Checkbox>
                </div>
              ))}
            </div>
            <div className="options-btn-wrapper">
              <Button type="primary" onClick={handleConfirm}>
                არჩევა
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Regions;
