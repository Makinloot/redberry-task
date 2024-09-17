import { useState, useRef, useEffect } from "react";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useAppContext } from "../../../context/ContextProvider";

const Rooms = () => {
  const [visible, setVisible] = useState(false);
  const { setBedrooms, bedrooms } = useAppContext();

  const dropdownRef = useRef(null);

  const handleBedroomSize = (value) => {
    if (!value) {
      setBedrooms("");
      localStorage.removeItem("bedrooms");
    } else {
      setBedrooms(value);
      localStorage.setItem("bedrooms", value);
    }
  };

  const toggleDropdown = () => {
    setVisible(!visible);
  };

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
          style={{ fontSize: 16 }}
        >
          საძინებლების რაოდენობა
          {visible ? (
            <UpOutlined style={{ fontSize: 13 }} />
          ) : (
            <DownOutlined style={{ fontSize: 13 }} />
          )}
        </Button>

        {visible && (
          <div
            ref={dropdownRef}
            className="options-dropdown"
            style={{ minWidth: 282 }}
          >
            <span className="options-title">საძინებლების რაოდენობა</span>
            <div className="bedroom-size-container">
              <Input
                className="bedroom-size"
                type="number"
                onChange={(e) => handleBedroomSize(e.target.value)}
                value={bedrooms}
              />
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

export default Rooms;
