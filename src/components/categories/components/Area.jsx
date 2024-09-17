import { useState, useRef, useEffect } from "react";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import m2Icon from "/m2-icon.png";
import { useAppContext } from "../../../context/ContextProvider";

const Area = () => {
  const [visible, setVisible] = useState(false);
  const dropdownRef = useRef(null);
  const { areaRange, setAreaRange } = useAppContext();

  const [error, setError] = useState("");

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  const handleInputChange = (field, value) => {
    setAreaRange((prev) => {
      const updatedPriceRange = { ...prev, [field]: value };
      localStorage.setItem("areaRange", JSON.stringify(updatedPriceRange));
      return updatedPriceRange;
    });
  };

  const handleSpanClick = (value) => {
    setAreaRange((prev) => {
      const updatedPriceRange = { ...prev, from: value };
      localStorage.setItem("areaRange", JSON.stringify(updatedPriceRange));
      return updatedPriceRange;
    });
  };

  const handleSpanClickTo = (value) => {
    setAreaRange((prev) => {
      const updatedPriceRange = { ...prev, to: value };
      localStorage.setItem("areaRange", JSON.stringify(updatedPriceRange));
      return updatedPriceRange;
    });
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

  useEffect(() => {
    if (areaRange.from && areaRange.to) {
      const fromValue = parseFloat(areaRange.from);
      const toValue = parseFloat(areaRange.to);

      if (fromValue > toValue) {
        setError("გთხოვთ, შეიყვანოთ სწორი დიაპაზონი");
      } else {
        setError(""); // Clear error if the range is valid
      }
    }
  }, [areaRange]);

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
          ფართობი
          {visible ? (
            <UpOutlined style={{ fontSize: 13 }} />
          ) : (
            <DownOutlined style={{ fontSize: 13 }} />
          )}
        </Button>

        {visible && (
          <div ref={dropdownRef} className="options-dropdown price">
            <span className="options-title">ფართობის მიხედვით</span>
            <div className="options-wrapper price">
              <Input
                className="price-input"
                placeholder="დან"
                suffix={<img src={m2Icon} />}
                onChange={(e) => handleInputChange("from", e.target.value)}
                value={areaRange.from}
              />
              <Input
                className="price-input"
                placeholder="მდე"
                suffix={<img src={m2Icon} />}
                onChange={(e) => handleInputChange("to", e.target.value)}
                value={areaRange.to}
              />
            </div>
            {error && (
              <span
                style={{
                  color: "red",
                  fontSize: 14,
                  whiteSpace: "nowrap",
                  marginTop: 5,
                  display: "block",
                }}
              >
                ჩაწერეთ ვალიდური მონაცემი
              </span>
            )}
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
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSpanClick("50,000")}
                  >
                    50,000 <img src={m2Icon} />
                  </span>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSpanClick("100,000")}
                  >
                    100,000 <img src={m2Icon} />
                  </span>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSpanClick("150,000")}
                  >
                    150,000 <img src={m2Icon} />
                  </span>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSpanClick("200,000")}
                  >
                    200,000 <img src={m2Icon} />
                  </span>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSpanClick("300,000")}
                  >
                    300,000 <img src={m2Icon} />
                  </span>
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
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSpanClickTo("50,000")}
                  >
                    50,000 <img src={m2Icon} />
                  </span>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSpanClickTo("100,000")}
                  >
                    100,000 <img src={m2Icon} />
                  </span>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSpanClickTo("150,000")}
                  >
                    150,000 <img src={m2Icon} />
                  </span>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSpanClickTo("200,000")}
                  >
                    200,000 <img src={m2Icon} />
                  </span>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSpanClickTo("300,000")}
                  >
                    300,000 <img src={m2Icon} />
                  </span>
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

export default Area;
