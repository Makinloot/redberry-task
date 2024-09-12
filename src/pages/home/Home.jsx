import { useEffect, useState } from "react";
import Categories from "../../components/categories/Categories";
import { useAppContext } from "../../context/ContextProvider";
import EstateCard from "../../components/estateCard/EstateCard";

const Home = () => {
  const { setBaseURL, api } = useAppContext();
  const [listings, setListings] = useState([]);
  // fetch listings
  useEffect(() => {
    const fetchCities = async () => {
      try {
        setBaseURL("https://api.real-estate-manager.redberryinternship.ge/api");
        const response = await api.get("/real-estates");
        console.log(response.data);
        setListings(response.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  return (
    <div className="Home">
      <div className="container">
        <div className="Home-wrapper">
          <Categories />
          <div
            style={{
              paddingTop: 32,
              display: "flex",
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            {listings.map((item) => (
              <div>
                <EstateCard
                  address={item.address}
                  area={item.area}
                  bedrooms={item.bedrooms}
                  city={item.city.name}
                  img={item.image}
                  price={item.price}
                  rented={item.is_rental}
                  zip={item.zip}
                  id={item.id}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
