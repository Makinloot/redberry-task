import { CheckOutlined, UploadOutlined } from "@ant-design/icons";
import "./AgentForm.css";
import { Form, Input, Button, Row, Col, Upload } from "antd";
import plusCircle from "/plus-circle.png";
import { useState } from "react";

const AgentForm = () => {
  const [form] = Form.useForm();
  const [isUploaded, setIsUploaded] = useState(false);

  const onFinish = (values) => {
    console.log("Form Submitted:", values);
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
      <Row gutter={31}>
        <Col span={12}>
          <Form.Item className="agent-form-item" name="name" label={"სახელი"}>
            <Input />
            <div className="input-field-msg-wrapper">
              <CheckOutlined />
              <span>მინიმუმ 2 სიმბოლო</span>
            </div>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item className="agent-form-item" label="გვარი" name="username">
            <Input />
            <div className="input-field-msg-wrapper">
              <CheckOutlined />
              <span>მინიმუმ 2 სიმბოლო</span>
            </div>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={31} style={{ marginTop: 28 }}>
        <Col span={12}>
          <Form.Item
            className="agent-form-item"
            label="ელ-ფოსტა"
            name="email"
            // rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
            <div className="input-field-msg-wrapper">
              <CheckOutlined />
              <span>გამოიყენეთ @redberry.ge ფოსტა</span>
            </div>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            className="agent-form-item"
            label="ტელეფონის ნომერი"
            name="mobileNumber"
            // rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
            <div className="input-field-msg-wrapper">
              <CheckOutlined />
              <span>მხოლოდ რიცხვები</span>
            </div>
          </Form.Item>
        </Col>
      </Row>

      <span className="upload-label">ატვირთეთ ფოტო</span>
      <Form.Item
        name="image"
        valuePropName="fileList"
        getValueFromEvent={(e) => console.log("THISS", e)}
        className="upload-input-wrapper"
      >
        <Upload
          listType="picture-card"
          beforeUpload={() => false}
          maxCount={1}
          onChange={(e) => {
            if (e.fileList.length > 0) setIsUploaded(true);
            else setIsUploaded(false);
          }}
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
