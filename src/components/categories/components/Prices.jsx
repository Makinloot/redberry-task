import { useState, useRef, useEffect } from "react";
import { UpOutlined, DownOutlined, DollarOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLariSign } from "@fortawesome/free-solid-svg-icons";
import lariIcon from "/lari-icon.png";

const Prices = () => {
  const [visible, setVisible] = useState(false);
  const dropdownRef = useRef(null);

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
          საფასო კატეგორია
          {visible ? (
            <UpOutlined style={{ fontSize: 13 }} />
          ) : (
            <DownOutlined style={{ fontSize: 13 }} />
          )}
        </Button>

        {visible && (
          <div ref={dropdownRef} className="options-dropdown price">
            <span className="options-title">ფასის მიხედვით</span>
            <div className="options-wrapper price">
              <Input className="price-input" placeholder="დან" suffix={"₾"} />
              <Input className="price-input" placeholder="მდე" suffix={"₾"} />
            </div>
            {/* offered prices */}
            <div className="auto-prices-wrapper">
              <div>
                <span className="auto-prices-title">მინ. ფასი</span>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    marginTop: 16,
                  }}
                >
                  <span>50,000 ₾</span>
                  <span>100,000 ₾</span>
                  <span>150,000 ₾</span>
                  <span>200,000 ₾</span>
                  <span>300,000 ₾</span>
                </div>
              </div>
              <div>
                <span className="auto-prices-title">მაქს. ფასი</span>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    marginTop: 16,
                  }}
                >
                  <span>50,000 ₾</span>
                  <span>100,000 ₾</span>
                  <span>150,000 ₾</span>
                  <span>200,000 ₾</span>
                  <span>300,000 ₾</span>
                </div>
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

export default Prices;
