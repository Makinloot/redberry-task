import { useState, useRef, useEffect } from "react";
import { UpOutlined, DownOutlined, DollarOutlined } from "@ant-design/icons";
import { Alert, Button, Input } from "antd";
import { useAppContext } from "../../../context/ContextProvider";

const Prices = () => {
  const [visible, setVisible] = useState(false);
  const dropdownRef = useRef(null);
  const { priceRange, setPriceRange } = useAppContext();

  const [error, setError] = useState("");

  const handleInputChange = (field, value) => {
    setPriceRange((prev) => {
      const updatedPriceRange = { ...prev, [field]: value };
      localStorage.setItem("priceRange", JSON.stringify(updatedPriceRange));
      return updatedPriceRange;
    });
  };

  const handleSpanClick = (value) => {
    setPriceRange((prev) => {
      const updatedPriceRange = { ...prev, from: value };
      localStorage.setItem("priceRange", JSON.stringify(updatedPriceRange));
      return updatedPriceRange;
    });
  };

  const handleSpanClickTo = (value) => {
    setPriceRange((prev) => {
      const updatedPriceRange = { ...prev, to: value };
      localStorage.setItem("priceRange", JSON.stringify(updatedPriceRange));
      return updatedPriceRange;
    });
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

  useEffect(() => {
    if (priceRange.from && priceRange.to) {
      const fromValue = parseFloat(priceRange.from);
      const toValue = parseFloat(priceRange.to);

      if (fromValue > toValue) {
        setError("გთხოვთ, შეიყვანოთ სწორი დიაპაზონი");
      } else {
        setError("");
      }
    }
  }, [priceRange]);

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
              <Input
                className="price-input"
                placeholder="დან"
                suffix="₾"
                onChange={(e) => handleInputChange("from", e.target.value)}
                value={priceRange.from}
              />
              <Input
                className="price-input"
                placeholder="მდე"
                suffix="₾"
                onChange={(e) => handleInputChange("to", e.target.value)}
                value={priceRange.to}
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
                    onClick={() => handleSpanClick("50000")}
                  >
                    50,000 ₾
                  </span>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSpanClick("100000")}
                  >
                    100,000 ₾
                  </span>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSpanClick("150000")}
                  >
                    150,000 ₾
                  </span>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSpanClick("200000")}
                  >
                    200,000 ₾
                  </span>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSpanClick("300000")}
                  >
                    300,000 ₾
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
                    onClick={() => handleSpanClickTo("50000")}
                  >
                    50,000 ₾
                  </span>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSpanClickTo("100000")}
                  >
                    100,000 ₾
                  </span>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSpanClickTo("150000")}
                  >
                    150,000 ₾
                  </span>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSpanClickTo("200000")}
                  >
                    200,000 ₾
                  </span>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSpanClickTo("300000")}
                  >
                    300,000 ₾
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

export default Prices;
