import Card from "antd/es/card/Card";
import "./EstateCard.css";
import pinIcon from "/pin.png";
import bedIcon from "/bed.png";
import squareMetersIcon from "/square-meters.png";
import zipIcon from "/zip.png";
import { Link, useNavigate } from "react-router-dom";
const EstateCard = ({
  img,
  price,
  address,
  city,
  bedrooms,
  area,
  zip,
  rented,
  id,
}) => {
  const navigate = useNavigate();
  return (
    <Card
      className="estate-card"
      hoverable
      cover={<img className="main-img" src={img} />}
      onClick={() => navigate(`/listing/${id}`)}
    >
      <div className="estate-card-details">
        <span className="estate-card-price">{price} ₾</span>
        <div className="estate-card-row">
          <img src={pinIcon} />
          <span>
            {city}, {address}
          </span>
        </div>
        <div className="estate-card-col">
          <div className="estate-card-row no-padding">
            <img src={bedIcon} />
            <span>{bedrooms}</span>
          </div>
          <div className="estate-card-row no-padding">
            <img src={squareMetersIcon} />
            <span>{area}</span>
          </div>
          <div className="estate-card-row no-padding">
            <img src={zipIcon} />
            <span>{zip}</span>
          </div>
        </div>
      </div>
      <span className="estate-card-rent">
        {rented ? "ქირავდება" : "იყიდება"}
      </span>
    </Card>
  );
};

export default EstateCard;
