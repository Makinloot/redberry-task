import React from "react";
import AddListingForm from "../../components/addListingForm/AddListingForm";

const AddListing = () => {
  return (
    <div className="Add">
      <div className="container">
        <div className="Add-wrapper">
          <p
            style={{
              fontSize: 32,
              fontWeight: 500,
              paddingTop: 62,
              paddingBottom: 62,
              textAlign: "center",
              fontFamily: "firago-medium",
            }}
          >
            ლისტინგის დამატება
          </p>
          <AddListingForm />
        </div>
      </div>
    </div>
  );
};

export default AddListing;
