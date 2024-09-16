import {
  Button,
  Col,
  Form,
  Input,
  message,
  Radio,
  Row,
  Select,
  Upload,
} from "antd";
import "./AddListingForm.css";
import { useEffect, useState } from "react";
import { CheckOutlined } from "@ant-design/icons";
import { useAppContext } from "../../context/ContextProvider";
import TextArea from "antd/es/input/TextArea";
import plusCircle from "/plus-circle.png";
import { useNavigate } from "react-router-dom";
import {
  handleImageValidations,
  handleNumberValidations,
  handleSelectValidations,
  handleStringValidations,
  handleTextValidations,
} from "../../utils/FormValidations";
const AddListingForm = () => {
  const [form] = Form.useForm();
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const { setBaseURL, api, setOpenModal, openModal } = useAppContext();
  const [selectedRegionId, setSelectedRegionId] = useState(
    sessionStorage.getItem("listingRegion") || null
  );
  const [isUploaded, setIsUploaded] = useState(false);
  const [imgBinary, setImgBinary] = useState(null);
  const [agents, setAgents] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  // validation states
  const [addressValidation, setAddressValidation] = useState({
    validateStatus: "",
    help: "",
  });
  const [zipCodeValidation, setZipCodeValidation] = useState({
    validateStatus: "",
    help: "",
  });

  const [regionValidation, setRegionValidation] = useState({
    validateStatus: "",
    help: "",
  });
  const [cityValidation, setCityValidation] = useState({
    validateStatus: "",
    help: "",
  });
  const [priceValidation, setPriceValidation] = useState({
    validateStatus: "",
    help: "",
  });
  const [areaValidation, setAreaValidation] = useState({
    validateStatus: "",
    help: "",
  });
  const [bedroomsValidation, setBedroomsValidation] = useState({
    validateStatus: "",
    help: "",
  });
  const [descriptionValidation, setDescriptionValidation] = useState({
    validateStatus: "",
    help: "",
  });
  const [imageValidation, setImageValidation] = useState({
    validateStatus: "",
    help: "",
  });
  const [agentValidation, setAgentValidation] = useState({
    validateStatus: "",
    help: "",
  });

  const success = () => {
    messageApi.open({
      type: "success",
      content: "ლისტინგი წარმატებით დაემატა",
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "გთხოვთ შეავსოთ ყველა სავალდებულო ველი სწორად",
    });
  };

  const onFinish = (values) => {
    try {
      // add agent
      const addListing = async () => {
        const formData = new FormData();
        formData.append("address", values.address);
        formData.append("region_id", values.region);
        formData.append("description", values.description);
        formData.append("city_id", values.city);
        formData.append("zip_code", values.zipCode);
        formData.append("price", values.price);
        formData.append("area", values.area);
        formData.append("bedrooms", values.bedrooms);
        formData.append("is_rental", values.radioGroup === 1 ? 0 : 1);
        formData.append("agent_id", values.agent);
        if (imgBinary) {
          formData.append("image", imgBinary, "avatar.png");
        }

        try {
          setBaseURL(
            "https://api.real-estate-manager.redberryinternship.ge/api"
          );
          await api.post(`/real-estates`, formData);
          success();
          setTimeout(() => {
            navigate("/");
          }, 500);
        } catch (error) {
          console.error("error adding listing:", error);
        }
      };

      addListing();
    } catch (err) {
      console.log("ERROR ADDING listing: ", err);
    }
  };

  // const onFinishFailed = ({ errorFields }) => {
  const onFinishFailed = ({ errorFields }) => {
    error();

    errorFields.forEach(({ name }) => {
      if (name[0] === "address") {
        handleStringValidations(
          { target: { value: form.getFieldValue("address") } },
          setAddressValidation
        );
      }

      if (name[0] === "zipCode") {
        handleNumberValidations(
          { target: { value: form.getFieldValue("zipCode") } },
          setZipCodeValidation,
          "number"
        );
      }

      if (name[0] === "region") {
        handleSelectValidations(
          form.getFieldValue("region"),
          setRegionValidation
        );
      }

      if (name[0] === "agent") {
        handleSelectValidations(
          form.getFieldValue("agent"),
          setAgentValidation
        );
      }

      if (name[0] === "city") {
        handleSelectValidations(form.getFieldValue("city"), setCityValidation);
      }

      if (name[0] === "price") {
        handleNumberValidations(
          { target: { value: form.getFieldValue("price") } },
          setPriceValidation,
          "number"
        );
      }

      if (name[0] === "area") {
        handleNumberValidations(
          { target: { value: form.getFieldValue("area") } },
          setAreaValidation,
          "number"
        );
      }

      if (name[0] === "bedrooms") {
        handleNumberValidations(
          { target: { value: form.getFieldValue("bedrooms") } },
          setBedroomsValidation,
          "number"
        );
      }

      if (name[0] === "description") {
        handleTextValidations("", setDescriptionValidation);
      }

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
    });
  };

  // fetch regions & cities
  useEffect(() => {
    const fetchData = async () => {
      try {
        setBaseURL("https://api.real-estate-manager.redberryinternship.ge/api");
        const response = await api.get("/regions");
        const responseCities = await api.get("/cities");
        setRegions(response.data);
        setCities(responseCities.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchData();
  }, []);

  // fetch agents
  useEffect(() => {
    const fetchData = async () => {
      try {
        setBaseURL("https://api.real-estate-manager.redberryinternship.ge/api");
        const agentsResponse = await api.get("/agents");
        setAgents(agentsResponse.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchData();
  }, [openModal]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="add-listing-form"
      initialValues={{
        address: sessionStorage.getItem("listingAddress") || "",
        zipCode: sessionStorage.getItem("listingZip") || null,
        region: Number(sessionStorage.getItem("listingRegion")) || null,
        // city needs to be fixed
        city: Number(sessionStorage.getItem("listingCity")) || null,
        price: Number(sessionStorage.getItem("listingPrice")) || null,
        area: Number(sessionStorage.getItem("listingArea")) || null,
        bedrooms: Number(sessionStorage.getItem("listingBedrooms")) || null,
        description: sessionStorage.getItem("listingDescription") || "",
        radioGroup:
          Number(sessionStorage.getItem("listingRadio")) > 0
            ? Number(sessionStorage.getItem("listingRadio"))
            : 1,
        agent: Number(sessionStorage.getItem("listingAgent")) || null,
      }}
    >
      {contextHolder}
      <p className="add-listing-form-title" style={{ marginBottom: 8 }}>
        გარიგების ტიპი
      </p>
      <Form.Item
        name="radioGroup"
        initialValue={1}
        style={{ marginBottom: 80 }}
      >
        <Radio.Group
          style={{ display: "flex", gap: 64 }}
          onChange={(e) =>
            sessionStorage.setItem("listingRadio", e.target.value)
          }
        >
          <Radio value={1}>იყიდება</Radio>
          <Radio value={2}>ქირავდება</Radio>
        </Radio.Group>
      </Form.Item>

      <p className="add-listing-form-title">მდებარეობა</p>
      <Row gutter={31}>
        <Col span={12}>
          <Form.Item
            className="agent-form-item"
            name="address"
            label={"მისამართი"}
            validateStatus={addressValidation.validateStatus}
            help={addressValidation.help}
            extra={
              addressValidation.validateStatus ? null : (
                <span>
                  <CheckOutlined /> მინიმუმ 2 სიმბოლო
                </span>
              )
            }
            rules={[{ required: true }, { min: 2 }]}
          >
            <Input
              className="agent-input"
              name="address"
              onChange={(e) => {
                handleStringValidations(e, setAddressValidation);
                sessionStorage.setItem("listingAddress", e.target.value);
              }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            className="agent-form-item"
            name="zipCode"
            label={"საფოსტო ინდექსი"}
            validateStatus={zipCodeValidation.validateStatus}
            help={zipCodeValidation.help}
            extra={
              zipCodeValidation.validateStatus ? null : (
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
              name="zipCpde"
              onChange={(e) => {
                handleNumberValidations(e, setZipCodeValidation, "number");
                sessionStorage.setItem("listingZip", e.target.value);
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={31} style={{ marginTop: 20, marginBottom: 80 }}>
        <Col span={12}>
          <Form.Item
            className="agent-form-item"
            name="region"
            label={"რეგიონი"}
            validateStatus={regionValidation.validateStatus}
            help={regionValidation.help}
            rules={[{ required: true }]}
          >
            <Select
              className="agent-input select-input"
              onChange={(value) => {
                handleSelectValidations(value, setRegionValidation);
                setSelectedRegionId(value);
                sessionStorage.setItem("listingRegion", value);
              }}
              options={regions.map((item) => ({
                label: item.name,
                value: item.id,
                className: "select-options",
              }))}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            className="agent-form-item"
            name="city"
            label={"ქალაქი"}
            validateStatus={cityValidation.validateStatus}
            help={cityValidation.help}
            rules={[{ required: true }]}
          >
            <Select
              disabled={!selectedRegionId}
              className="agent-input select-input"
              onChange={(value) => {
                handleSelectValidations(value, setCityValidation);
                sessionStorage.setItem("listingCity", value);
              }}
              options={cities
                .filter((item) => {
                  return item.region_id === Number(selectedRegionId);
                })
                .map((item) => {
                  console.log(item);
                  return {
                    label: item.name,
                    value: item.id,
                    className: "select-options",
                  };
                })}
            />
          </Form.Item>
        </Col>
      </Row>

      <p className="add-listing-form-title">ბინის დეტალები</p>
      <Row gutter={31}>
        <Col span={12}>
          <Form.Item
            className="agent-form-item"
            name="price"
            label={"ფასი"}
            validateStatus={priceValidation.validateStatus}
            help={priceValidation.help}
            extra={
              priceValidation.validateStatus ? null : (
                <span>
                  <CheckOutlined /> ნუმერული სიმბოლოები
                </span>
              )
            }
            rules={[{ required: true }]}
          >
            <Input
              className="agent-input"
              name="price"
              onChange={(e) => {
                handleNumberValidations(e, setPriceValidation, "number");
                sessionStorage.setItem("listingPrice", e.target.value);
              }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            className="agent-form-item"
            name="area"
            label={"ფართობი"}
            validateStatus={areaValidation.validateStatus}
            help={areaValidation.help}
            extra={
              areaValidation.validateStatus ? null : (
                <span>
                  <CheckOutlined /> ნუმერული სიმბოლოები
                </span>
              )
            }
            rules={[{ required: true }]}
          >
            <Input
              className="agent-input"
              name="area"
              onChange={(e) => {
                handleNumberValidations(e, setAreaValidation, "number");
                sessionStorage.setItem("listingArea", e.target.value);
              }}
            />
          </Form.Item>
        </Col>
        <Col span={12} style={{ marginTop: 20, marginBottom: 20 }}>
          <Form.Item
            className="agent-form-item"
            name="bedrooms"
            label={"საძინებლების რაოდენობა"}
            validateStatus={bedroomsValidation.validateStatus}
            help={bedroomsValidation.help}
            extra={
              bedroomsValidation.validateStatus ? null : (
                <span>
                  <CheckOutlined /> ნუმერული სიმბოლოები
                </span>
              )
            }
            rules={[
              { required: true },
              {
                validator: (_, value) =>
                  value && Number.isInteger(Number(value))
                    ? Promise.resolve()
                    : Promise.reject(new Error("ნუმერული სიმბოლოები")),
              },
            ]}
          >
            <Input
              className="agent-input"
              name="bedrooms"
              onChange={(e) => {
                handleNumberValidations(e, setBedroomsValidation, "number");
                sessionStorage.setItem("listingBedrooms", e.target.value);
              }}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            className="agent-form-item"
            name="description"
            label={"აღწერა"}
            validateStatus={descriptionValidation.validateStatus}
            help={descriptionValidation.help}
            extra={
              descriptionValidation.validateStatus ? null : (
                <span>
                  <CheckOutlined /> მინიმუმ ხუთი სიტყვა
                </span>
              )
            }
            rules={[{ required: true }]}
          >
            <TextArea
              className="agent-input"
              name="description"
              rows={6}
              style={{ resize: "none" }}
              onChange={(e) => {
                handleTextValidations(e.target.value, setDescriptionValidation);
                sessionStorage.setItem("listingDescription", e.target.value);
              }}
              rules={[
                { required: true, message: "სავალდებულო ველია" },
                {
                  validator: (_, value) => {
                    const trimmedValue = value ? value.trim() : "";
                    const wordCount = trimmedValue
                      .split(/\s+/)
                      .filter(Boolean).length;

                    if (wordCount < 5) {
                      return Promise.reject(new Error("მინიმუმ 5 სიტყვა"));
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={24} style={{ marginTop: 20 }}>
          <span className="upload-label">ატვირთეთ ფოტო</span>
          <Form.Item
            name="avatar"
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
            className="upload-input-wrapper"
            validateStatus={imageValidation.validateStatus}
            help={imageValidation.help}
            style={{ marginTop: 7 }}
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
                <Button
                  className="upload-btn"
                  icon={<img src={plusCircle} />}
                />
              )}
            </Upload>
          </Form.Item>
        </Col>
      </Row>

      <p
        className="add-listing-form-title"
        style={{ marginBottom: 8, marginTop: 80 }}
      >
        აგენტი
      </p>
      <Row>
        <Col span={12}>
          <Form.Item
            className="agent-form-item"
            name="agent"
            label={"აირჩიე"}
            validateStatus={agentValidation.validateStatus}
            help={agentValidation.help}
            rules={[{ required: true }]}
          >
            <Select
              className="agent-input select-input"
              onChange={(value) => {
                if (value === "logRed") {
                  console.log("red");
                  return;
                }
                handleSelectValidations(value, setAgentValidation);
                sessionStorage.setItem("listingAgent", value);
              }}
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <button
                    type="button"
                    onClick={() => setOpenModal(true)}
                    className="inside-select-btn"
                  >
                    <img src={plusCircle} />
                    <span>დაამატე აგენტი</span>
                  </button>
                </>
              )}
              options={agents.map((item) => ({
                label: item.name,
                value: item.id,
                className: "select-options",
              }))}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item className="form-buttons">
        <Row justify={"end"} gutter={15}>
          <Col>
            <button type="button" className="cancel-agent">
              გაუქმება
            </button>
          </Col>
          <Col>
            <button type="submit">დაამატე ლისტინგი</button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default AddListingForm;
