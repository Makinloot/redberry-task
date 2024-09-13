import {
  CheckOutlined,
  CloseOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "./AgentForm.css";
import { Form, Input, Button, Row, Col, Upload, Alert } from "antd";
import plusCircle from "/plus-circle.png";
import { useState } from "react";
import {
  handleNameChange,
  handleLastNameChange,
  handleEmailChange,
  handlePhoneNumberChange,
  handleImageUploadChange,
} from "./validations";
import { useAppContext } from "../../context/ContextProvider";

const AgentForm = () => {
  const [form] = Form.useForm();
  const [isUploaded, setIsUploaded] = useState(false);
  const { setBaseURL, api } = useAppContext();
  const [imgBinary, setImgBinary] = useState(null); // State for binary image

  // validation states
  const [nameValidation, setNameValidation] = useState({
    validateStatus: "",
    help: "",
  });
  const [lastNameValidation, setLastNameValidation] = useState({
    validateStatus: "",
    help: "",
  });
  const [emailValidation, setEmailValidation] = useState({
    validateStatus: "",
    help: "",
  });
  const [phoneNumberValidation, setPhoneNumberValidation] = useState({
    validateStatus: "",
    help: "",
  });
  const [imageValidation, setImageValidation] = useState({
    validateStatus: "",
    help: "",
  });

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const onFinish = (values) => {
    console.log("Form Submitted:", values);
    setAlertVisible(false);

    try {
      // add agent
      const addAgent = async () => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("surname", values.surname);
        formData.append("email", values.email);
        formData.append("phone", values.phone);
        if (imgBinary) {
          formData.append("avatar", imgBinary, "avatar.png"); // Ensure correct filename and MIME type
        }

        console.log("AGENT VALUES", formData);
        try {
          setBaseURL(
            "https://api.real-estate-manager.redberryinternship.ge/api"
          );
          const response = await api.post(`/agents`, formData);
          console.log(response.data);
        } catch (error) {
          console.error("error adding agent:", error);
        }
      };

      addAgent();
    } catch (error) {
      console.log("ERROR ADDING AGENT: ", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setAlertMessage("Please fill out all required fields correctly!");
    setAlertVisible(true);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {alertVisible && (
        <Alert
          message={alertMessage}
          type="error"
          showIcon
          closable
          onClose={() => setAlertVisible(false)}
        />
      )}
      <Row gutter={31}>
        <Col span={12}>
          <Form.Item
            className="agent-form-item"
            name="name"
            label={"სახელი"}
            validateStatus={nameValidation.validateStatus}
            help={nameValidation.help}
            extra={
              nameValidation.validateStatus ? null : (
                <span>
                  <CheckOutlined /> მინიმუმ 2 სიმბოლო
                </span>
              )
            }
            rules={[{ required: true }, { min: 2 }]}
          >
            <Input
              className="agent-input"
              name="name"
              onChange={(e) => handleNameChange(e, setNameValidation)}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            className="agent-form-item"
            name="surname"
            label={"გვარი"}
            validateStatus={lastNameValidation.validateStatus}
            help={lastNameValidation.help}
            extra={
              lastNameValidation.validateStatus ? null : (
                <span>
                  <CheckOutlined /> მინიმუმ 2 სიმბოლო
                </span>
              )
            }
            rules={[{ required: true }, { min: 2 }]}
          >
            <Input
              className="agent-input"
              name="surname"
              onChange={(e) => handleLastNameChange(e, setLastNameValidation)}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={31} style={{ marginTop: 28, marginBottom: 28 }}>
        <Col span={12}>
          <Form.Item
            className="agent-form-item"
            name="email"
            label={"ელ. ფოსტა"}
            validateStatus={emailValidation.validateStatus}
            help={emailValidation.help}
            extra={
              emailValidation.validateStatus ? null : (
                <span>
                  <CheckOutlined /> გამოიყენეთ @redberry.ge ფოსტა
                </span>
              )
            }
            rules={[
              { required: true },
              {
                pattern: /^[a-zA-Z0-9._%+-]+@redberry\.ge$/,
              },
            ]}
          >
            <Input
              className="agent-input"
              name="email"
              onChange={(e) => handleEmailChange(e, setEmailValidation)}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            className="agent-form-item"
            name="phone"
            label={"ტელეფონის ნომერი"}
            validateStatus={phoneNumberValidation.validateStatus}
            help={phoneNumberValidation.help}
            extra={
              phoneNumberValidation.validateStatus ? null : (
                <span>
                  <CheckOutlined /> მხოლოდ ციფრები
                </span>
              )
            }
            rules={[
              { required: true },
              {
                pattern: /^[0-9]*$/,
              },
            ]}
          >
            <Input
              className="agent-input"
              name="phone"
              onChange={(e) =>
                handlePhoneNumberChange(e, setPhoneNumberValidation)
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <span className="upload-label">ატვირთეთ ფოტო</span>
      <Form.Item
        name="avatar"
        valuePropName="fileList"
        getValueFromEvent={(e) => e.fileList}
        className="upload-input-wrapper"
        validateStatus={imageValidation.validateStatus}
        help={imageValidation.help}
      >
        <Upload
          listType="picture-card"
          beforeUpload={() => false}
          maxCount={1}
          onChange={(e) =>
            handleImageUploadChange(
              e.fileList,
              setImageValidation,
              setIsUploaded,
              setImgBinary // Pass setImgBinary to handleImageUploadChange
            )
          }
          showUploadList={{
            showPreviewIcon: false,
            showRemoveIcon: true,
          }}
        >
          {!isUploaded && (
            <Button className="upload-btn" icon={<img src={plusCircle} />} />
          )}
        </Upload>
      </Form.Item>
      <Form.Item className="form-buttons">
        <Row justify={"end"} gutter={15}>
          <Col>
            <button type="button" className="cancel-agent">
              გაუქმება
            </button>
          </Col>
          <Col>
            <button type="submit">დაამატე აგენტი</button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default AgentForm;
