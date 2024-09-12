import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { useAppContext } from "../../../context/ContextProvider";
import AgentModal from "../../agentModal/AgentModal";

const AddBtns = () => {
  const { setOpenModal } = useAppContext();
  return (
    <div className="add-btns">
      <Button icon={<PlusOutlined />} className="add-btn ">
        ლისტინგის დამატება
      </Button>
      <Button
        icon={<PlusOutlined />}
        className="add-btn agent-btn"
        onClick={() => setOpenModal(true)}
      >
        აგენტის დამატება
      </Button>
      <AgentModal />
    </div>
  );
};

export default AddBtns;
