import { useEffect, useState } from "react";
import Categories from "../../components/categories/Categories";
import { useAppContext } from "../../context/ContextProvider";
import EstateCard from "../../components/estateCard/EstateCard";
import Filters from "../../components/filters/Filters";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const { setBaseURL, api, selectedItems, priceRange, areaRange, bedrooms } =
    useAppContext();
  const [listings, setListings] = useState([]);
  // fetch listings
  useEffect(() => {
    const fetchCities = async () => {
      try {
        setBaseURL("https://api.real-estate-manager.redberryinternship.ge/api");
        const response = await api.get("/real-estates");
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
          <Filters />
          <div
            style={{
              paddingTop: 32,
              display: "flex",
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            {listings
              .filter((item) => {
                // Region filter
                const isInSelectedRegion =
                  selectedItems.length === 0 ||
                  selectedItems.includes(item.city.region.name);

                // Price filter
                const priceFrom = priceRange.from
                  ? parseFloat(priceRange.from)
                  : 0;
                const priceTo = priceRange.to
                  ? parseFloat(priceRange.to)
                  : Infinity;
                const isInPriceRange =
                  (!priceRange.from || item.price >= priceFrom) &&
                  (!priceRange.to || item.price <= priceTo);

                // Area filter
                const areaFrom = areaRange.from
                  ? parseFloat(areaRange.from)
                  : 0;
                const areaTo = areaRange.to
                  ? parseFloat(areaRange.to)
                  : Infinity;
                const isInAreaRange =
                  (!areaRange.from || item.area >= areaFrom) &&
                  (!areaRange.to || item.area <= areaTo);

                // Bedrooms filter
                const isInBedroomsRange =
                  bedrooms === 0 || item.bedrooms === bedrooms;

                // Combine all filters
                return (
                  isInSelectedRegion &&
                  isInPriceRange &&
                  isInAreaRange &&
                  isInBedroomsRange
                );
              })
              .map((item) => (
                <div key={item.id}>
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
              ))}
            {listings.filter((item) => {
              const isInSelectedRegion =
                selectedItems.length === 0 ||
                selectedItems.includes(item.city.region.name);

              const priceFrom = priceRange.from
                ? parseFloat(priceRange.from)
                : 0;
              const priceTo = priceRange.to
                ? parseFloat(priceRange.to)
                : Infinity;
              const isInPriceRange =
                (!priceRange.from || item.price >= priceFrom) &&
                (!priceRange.to || item.price <= priceTo);

              const areaFrom = areaRange.from ? parseFloat(areaRange.from) : 0;
              const areaTo = areaRange.to ? parseFloat(areaRange.to) : Infinity;
              const isInAreaRange =
                (!areaRange.from || item.area >= areaFrom) &&
                (!areaRange.to || item.area <= areaTo);

              const isInBedroomsRange =
                bedrooms === 0 || item.bedrooms === bedrooms;

              return (
                isInSelectedRegion &&
                isInPriceRange &&
                isInAreaRange &&
                isInBedroomsRange
              );
            }).length === 0 && (
              <span style={{ fontSize: 20, color: "#021526CC" }}>
                აღნიშნული მონაცემებით განცხადება არ იძებნება
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
