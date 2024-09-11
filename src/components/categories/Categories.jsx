import "./Categories.css";
import AddBtns from "./components/AddBtns";
import Area from "./components/Area";
import Prices from "./components/Prices";
import Regions from "./components/Regions";
import Rooms from "./components/Rooms";
const Categories = () => {
  return (
    <div className="wrapper">
      <div className="categories">
        <Regions />
        <Prices />
        <Area />
        <Rooms />
      </div>
      <AddBtns />
    </div>
  );
};

export default Categories;
