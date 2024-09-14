import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { useAppContext } from "../../../context/ContextProvider";
import AgentModal from "../../agentModal/AgentModal";
import { useNavigate } from "react-router-dom";

const AddBtns = () => {
  const { setOpenModal } = useAppContext();
  const navigate = useNavigate();
  return (
    <div className="add-btns">
      <Button
        icon={<PlusOutlined />}
        className="add-btn"
        onClick={() => navigate("/add")}
      >
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
