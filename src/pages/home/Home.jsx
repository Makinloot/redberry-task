import { useEffect, useState } from "react";
import Categories from "../../components/categories/Categories";
import { useAppContext } from "../../context/ContextProvider";
import EstateCard from "../../components/estateCard/EstateCard";
import Filters from "../../components/filters/Filters";

const Home = () => {
  const { setBaseURL, api, selectedItems, priceRange, areaRange, bedrooms } =
    useAppContext();
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);

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

  /*
    filter data by selected filter categories,
    if at least one filter category matches selected filters,
    push that object to array and return it,
    if there is no filters return unfiltered array
  */
  function filterData() {
    const filteredData = listings.filter((estate) => {
      let arr = [];

      if (priceRange.from && priceRange.to) {
        arr.push(
          estate.price < priceRange.to && estate.price > priceRange.from
        );
      }
      if (!priceRange.from && priceRange.to) {
        arr.push(estate.price < priceRange.to);
      }
      if (priceRange.from && !priceRange.to) {
        arr.push(estate.price > priceRange.from);
      }
      if (areaRange.from && areaRange.to) {
        arr.push(estate.area < areaRange.to && estate.area > areaRange.from);
      }
      if (!areaRange.from && areaRange.to) {
        arr.push(estate.area < areaRange.to);
      }
      if (areaRange.from && !areaRange.to) {
        arr.push(estate.area > areaRange.from);
      }
      if (selectedItems.length > 0) {
        arr.push(selectedItems.includes(estate.city.region.name));
      }
      if (bedrooms) {
        arr.push(estate.bedrooms == bedrooms);
      }

      if (arr.length === 0) {
        return true;
      }

      return arr.some((val) => val === true);
    });

    setFilteredListings(filteredData);
  }

  // filter data according to user preferences
  useEffect(() => {
    filterData();
  }, [
    listings,
    priceRange.from,
    priceRange.to,
    selectedItems,
    areaRange.from,
    areaRange.to,
    bedrooms,
  ]);

  // remove saved values in addListing page
  useEffect(() => {
    sessionStorage.clear();
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
              paddingBottom: 32,
              display: "flex",
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            {listings.length < 1 ? (
              ""
            ) : listings.length > 0 && filteredListings.length > 0 ? (
              filteredListings.map((item) => (
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
              ))
            ) : (
              <span style={{ fontSize: 20, fontFamily: "firago-medium" }}>
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
