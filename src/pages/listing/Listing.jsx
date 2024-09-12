import React, { useEffect, useState } from "react";
import testImg from "/test.png";
import "./Listing.css";
import bedIcon from "/bed.png";
import pinIcon from "/pin.png";
import squareMetersIcon from "/square-meters.png";
import zipIcon from "/zip.png";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../context/ContextProvider";
import m2Icon from "/m2-icon.png";
import moment from "moment";
import emailIcon from "/email.png";
import phoneIcon from "/phone.png";
import { Button } from "antd";

const Listing = () => {
  const { id } = useParams();

  const { setBaseURL, api } = useAppContext();
  const [listing, setListing] = useState();
  // fetch listing
  useEffect(() => {
    const fetchCities = async () => {
      try {
        setBaseURL("https://api.real-estate-manager.redberryinternship.ge/api");
        const response = await api.get(`/real-estates/${id}`);
        console.log(response.data);
        setListing(response.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  console.log(listing);

  if (listing)
    return (
      <div className="Listing">
        <div className="container">
          <div className="Listing-wrapper">
            <div className="Listing-details">
              <div className="Listing-details-img">
                <img src={listing.image} />
                <span className="release-date">
                  გამოქვეყნების თარიღი{" "}
                  {moment(listing.created_at).format("DD/MM/YYYY")}
                </span>
                <span className="rental-span">
                  {listing.is_rental ? "ქირავდება" : "იყიდება"}
                </span>
              </div>
              <div className="listing-details-info">
                <div className="price-wrapper">
                  <span>{listing.price} ₾</span>
                </div>
                <div className="details-flex">
                  <div className="details-flex-item">
                    <img src={pinIcon} />
                    <span>
                      {listing.city.name}, {listing.address}{" "}
                    </span>
                  </div>
                  <div className="details-flex-item">
                    <img src={squareMetersIcon} />
                    <span>
                      {`ფართი ${listing.area}`} <img src={m2Icon} />
                    </span>
                  </div>
                  <div className="details-flex-item">
                    <img src={bedIcon} />
                    <span>საძინებელი {listing.bedrooms}</span>
                  </div>
                  <div className="details-flex-item">
                    <img src={zipIcon} />
                    <span>საფოსტო ინდექსი {listing.zip_code}</span>
                  </div>
                </div>

                <p className="listing-text">{listing.description}</p>

                <div className="listing-agent-wrapper">
                  <div
                    style={{ display: "flex", gap: 14, alignItems: "center" }}
                  >
                    <img className="agent-img" src={testImg} />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span className="agent-name">
                        {listing.agent.name} {listing.agent.surname}
                      </span>
                      <span className="agent-status">აგენტი</span>
                    </div>
                  </div>
                  <div style={{ marginTop: 16 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        color: "#808A93",
                      }}
                    >
                      <img src={emailIcon} />
                      <span>{listing.agent.email}</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        color: "#808A93",
                      }}
                    >
                      <img src={phoneIcon} />
                      <span>{listing.agent.phone}</span>
                    </div>
                  </div>
                </div>
                {/* <button className="delete-listing">ლისტინგის წაშლა</button> */}
                <Button className="delete-listing">ლისტინგის წაშლა</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

{
  /* <div className="estate-card-col">
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
</div> */
}

export default Listing;
