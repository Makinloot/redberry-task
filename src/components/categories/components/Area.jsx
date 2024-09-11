import { useState, useRef, useEffect } from "react";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import m2Icon from "/m2-icon.png";

const Area = () => {
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

  const options = ["Option 1", "Option 2", "Option 3"];

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
              />
              <Input
                className="price-input"
                placeholder="მდე"
                suffix={<img src={m2Icon} />}
              />
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
                  <span>
                    50,000 <img src={m2Icon} />
                  </span>
                  <span>
                    100,000 <img src={m2Icon} />
                  </span>
                  <span>
                    150,000 <img src={m2Icon} />
                  </span>
                  <span>
                    200,000 <img src={m2Icon} />
                  </span>
                  <span>
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
                  <span>
                    50,000 <img src={m2Icon} />
                  </span>
                  <span>
                    100,000 <img src={m2Icon} />
                  </span>
                  <span>
                    150,000 <img src={m2Icon} />
                  </span>
                  <span>
                    200,000 <img src={m2Icon} />
                  </span>
                  <span>
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
