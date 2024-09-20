import React, { useEffect, useState } from "react";
import testImg from "/test.png";
import "./Listing.css";
import bedIcon from "/bed.png";
import pinIcon from "/pin.png";
import squareMetersIcon from "/square-meters.png";
import zipIcon from "/zip.png";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/ContextProvider";
import m2Icon from "/m2-icon.png";
import moment from "moment";
import emailIcon from "/email.png";
import phoneIcon from "/phone.png";
import { Button, Modal } from "antd";
import arrowLeft from "/arrow-left.png";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules";
import EstateCard from "../../components/estateCard/EstateCard";

const Listing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setBaseURL, api } = useAppContext();
  const [listing, setListing] = useState();
  const [open, setOpen] = useState(false);
  const [filteredRegions, setFilteredRegions] = useState([]);

  // fetch listing
  useEffect(() => {
    const fetchCities = async () => {
      try {
        setBaseURL("https://api.real-estate-manager.redberryinternship.ge/api");
        const response = await api.get(`/real-estates/${id}`);
        console.log(response.data);
        setListing(response.data);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, [id]);

  // fetch similar listings
  useEffect(() => {
    const fetchSimilar = async () => {
      try {
        const response = await api.get("/real-estates");
        const allSimilar = response.data;

        if (listing) {
          const filteredSimilar = allSimilar.filter(
            (item) =>
              item.city.region_id === listing.city.region_id &&
              item.id !== listing.id
          );
          setFilteredRegions(filteredSimilar);
        }
      } catch (error) {
        console.error("Error fetching similar listings:", error);
      }
    };

    fetchSimilar();
  }, [listing, api]);

  // handle delete listing
  const deleteListing = async (id) => {
    try {
      setBaseURL("https://api.real-estate-manager.redberryinternship.ge/api");
      await api.delete(`/real-estates/${id}`);
      navigate("/");
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  if (listing)
    return (
      <div className="Listing">
        <div className="container">
          <div className="Listing-wrapper">
            <div style={{ marginBottom: 35 }}>
              <img
                onClick={() => window.history.back()}
                style={{ cursor: "pointer" }}
                src={arrowLeft}
              />
            </div>
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
                    <img className="agent-img" src={listing.agent.avatar} />
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
                <Button
                  className="delete-listing"
                  onClick={() => setOpen(true)}
                >
                  ლისტინგის წაშლა
                </Button>
                <Modal style={{ borderRadius: 20 }} open={open} footer={false}>
                  <div
                    style={{
                      display: "flex",
                      gap: 15,
                      flexDirection: "column",
                      justifyItems: "center",
                      alignItems: "center",
                      paddingTop: 20,
                    }}
                  >
                    <p>გსურთ წაშალოთ ლისტინგი?</p>
                    <div
                      style={{
                        display: "flex",
                        gap: 15,
                      }}
                    >
                      <Button
                        className="delete-listing-btn cancel"
                        onClick={() => setOpen(false)}
                      >
                        გაუქმება
                      </Button>
                      <Button
                        className="delete-listing-btn"
                        onClick={() => deleteListing(id)}
                      >
                        დადასტურება
                      </Button>
                    </div>
                  </div>
                </Modal>
              </div>
            </div>

            {/* carousel */}
            {filteredRegions.length < 1 && (
              <p className="slider-title">
                ბინები მსგავს ლოკაციაზე ვერ მოიძებნა
              </p>
            )}
            {filteredRegions.length > 0 && (
              <div>
                <p className="slider-title">ბინები მსგავს ლოკაციაზე</p>
                <Swiper
                  slidesPerView={4}
                  loop={true}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                  className="mySwiper"
                >
                  {filteredRegions.map((item) => (
                    <SwiperSlide key={item.id}>
                      <div>
                        <EstateCard
                          address={item.address}
                          area={item.area}
                          bedrooms={item.bedrooms}
                          city={item.city.name}
                          img={item.image}
                          price={item.price}
                          rented={item.is_rental}
                          zip={item.zip_code}
                          id={item.id}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        </div>
      </div>
    );
};

export default Listing;
