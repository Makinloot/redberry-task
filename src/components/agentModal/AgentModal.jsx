import { Modal } from "antd";
import { useAppContext } from "../../context/ContextProvider";
import "./AgentModal.css";
import AgentForm from "../agentForm/AgentForm";

const AgentModal = () => {
  const { openModal, setOpenModal } = useAppContext();
  const handleOk = () => {
    setOpenModal(false);
  };
  const handleCancel = () => {
    setOpenModal(false);
  };

  return (
    <Modal
      className="agent-modal"
      open={openModal}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      closable={false}
    >
      <h2 className="agent-modal-title">აგენტის დამატება</h2>
      <AgentForm />
    </Modal>
  );
};

export default AgentModal;
