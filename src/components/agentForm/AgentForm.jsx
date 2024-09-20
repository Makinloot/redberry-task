import { CheckOutlined } from "@ant-design/icons";
import "./AgentForm.css";
import { Form, Input, Button, Row, Col, Upload, message } from "antd";
import plusCircle from "/plus-circle.png";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/ContextProvider";
import {
  handleEmailValidations,
  handleImageValidations,
  handleNumberValidations,
  handleStringValidations,
} from "../../utils/FormValidations";

const AgentForm = () => {
  const [form] = Form.useForm();
  const [isUploaded, setIsUploaded] = useState(false);
  const { setBaseURL, api, setOpenModal, openModal } = useAppContext();
  const [imgBinary, setImgBinary] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

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

  const handleResetValidations = () => {
    setNameValidation({
      validateStatus: "",
      help: "",
    });
    setLastNameValidation({
      validateStatus: "",
      help: "",
    });
    setEmailValidation({
      validateStatus: "",
      help: "",
    });
    setPhoneNumberValidation({
      validateStatus: "",
      help: "",
    });
    setImageValidation({
      validateStatus: "",
      help: "",
    });
    setIsUploaded(false);
    setImgBinary(null);
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "აგენტი წარმატებით დაემატა",
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "გთხოვთ შეავსოთ ყველა სავალდებულო ველი სწორად",
    });
  };

  /*
    handle form by sending object of new agent to server,
    show sccess message and close modal
  */
  const onFinish = (values) => {
    try {
      // add agent
      const addAgent = async () => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("surname", values.surname);
        formData.append("email", values.email);
        formData.append("phone", values.phone);
        if (imgBinary) {
          formData.append("avatar", imgBinary, "avatar.png");
        }

        try {
          setBaseURL(
            "https://api.real-estate-manager.redberryinternship.ge/api"
          );
          await api.post(`/agents`, formData);
          success();
          setTimeout(() => {
            setOpenModal(false);
          }, 500);
        } catch (error) {
          console.error("error adding agent:", error);
        }
      };

      addAgent();
    } catch (err) {
      console.log("ERROR ADDING AGENT: ", err);
    }
  };

  /*
    if submitting form fails display error message
    also show input field validations to see where is errors
  */
  const onFinishFailed = ({ errorFields }) => {
    error();

    errorFields.forEach(({ name }) => {
      if (name[0] === "name") {
        handleStringValidations(
          { target: { value: form.getFieldValue("name") } },
          setNameValidation
        );
      }

      if (name[0] === "surname") {
        handleStringValidations(
          { target: { value: form.getFieldValue("surname") } },
          setLastNameValidation
        );
      }

      if (name[0] === "email") {
        handleEmailValidations(
          { target: { value: form.getFieldValue("email") } },
          setEmailValidation
        );
      }

      if (name[0] === "phone") {
        handleNumberValidations(
          { target: { value: form.getFieldValue("phone") } },
          setPhoneNumberValidation,
          "phone"
        );
      }
    });

    if (!isUploaded) {
      setImageValidation({
        validateStatus: "error",
        help: (
          <div>
            <CheckOutlined /> <span>გთხოვთ ატვირთოთ ფოტო</span>
          </div>
        ),
      });
    }
  };

  useEffect(() => {
    if (!openModal) {
      form.resetFields();
      handleResetValidations();
    }
  }, [openModal]);
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {contextHolder}
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
              onChange={(e) => {
                handleStringValidations(e, setNameValidation);
              }}
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
              onChange={(e) => {
                handleStringValidations(e, setLastNameValidation);
              }}
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
              onChange={(e) => {
                handleEmailValidations(e, setEmailValidation);
              }}
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
              onChange={(e) => {
                handleNumberValidations(e, setPhoneNumberValidation, "phone");
              }}
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
        rules={[{ required: true }]}
      >
        <Upload
          listType="picture-card"
          beforeUpload={() => false}
          maxCount={1}
          onChange={(e) =>
            handleImageValidations(
              e.fileList,
              setImageValidation,
              setIsUploaded,
              setImgBinary
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
            <button
              type="button"
              className="cancel-agent"
              onClick={() => {
                setOpenModal(false);
                form.resetFields();
                handleResetValidations();
                setIsUploaded(false);
                setImgBinary(null);
              }}
            >
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
