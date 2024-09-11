import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

const AddBtns = () => {
  return (
    <div className="add-btns">
      <Button icon={<PlusOutlined />} className="add-btn ">
        ლისტინგის დამატება
      </Button>
      <Button icon={<PlusOutlined />} className="add-btn agent-btn">
        აგენტის დამატება
      </Button>
    </div>
  );
};

export default AddBtns;
