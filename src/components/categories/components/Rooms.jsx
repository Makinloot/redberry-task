import { useState, useRef, useEffect } from "react";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useAppContext } from "../../../context/ContextProvider";

const Rooms = () => {
  const [visible, setVisible] = useState(false);
  const { setBedrooms, bedrooms } = useAppContext();

  const dropdownRef = useRef(null);

  const handleBedroomSize = (value) => {
    if (bedrooms === value) {
      setBedrooms(0);
      localStorage.setItem("bedrooms", 0);
    } else setBedrooms(value);
    localStorage.setItem("bedrooms", value);
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
            {/* room amounts */}
            <div className="bedroom-size-container">
              <div
                className={`bedroom-size ${bedrooms === 1 ? "active" : ""}`}
                onClick={() => handleBedroomSize(1)}
              >
                <span>1</span>
              </div>
              <div
                className={`bedroom-size ${bedrooms === 2 ? "active" : ""}`}
                onClick={() => handleBedroomSize(2)}
              >
                <span>2</span>
              </div>
              <div
                className={`bedroom-size ${bedrooms === 3 ? "active" : ""}`}
                onClick={() => handleBedroomSize(3)}
              >
                <span>3</span>
              </div>
              <div
                className={`bedroom-size ${bedrooms === 4 ? "active" : ""}`}
                onClick={() => handleBedroomSize(4)}
              >
                <span>4</span>
              </div>
              <div
                className={`bedroom-size ${bedrooms === 5 ? "active" : ""}`}
                onClick={() => handleBedroomSize(5)}
              >
                <span>5</span>
              </div>
              <div
                className={`bedroom-size ${bedrooms === 6 ? "active" : ""}`}
                onClick={() => handleBedroomSize(6)}
              >
                <span>6</span>
              </div>
              <div
                className={`bedroom-size ${bedrooms === 7 ? "active" : ""}`}
                onClick={() => handleBedroomSize(7)}
              >
                <span>7</span>
              </div>
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
