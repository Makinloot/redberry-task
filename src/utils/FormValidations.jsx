import { CheckOutlined } from "@ant-design/icons";

/*
  handles string input validations,
  requires event and setState to put result messages
*/
export const handleStringValidations = (e, setValidation) => {
  const value = e.target.value;

  if (!value) {
    setValidation({
      validateStatus: "error",
      help: (
        <div>
          <CheckOutlined /> <span>სავალდებულო</span>
        </div>
      ),
    });
  } else if (value.length < 2) {
    setValidation({
      validateStatus: "error",
      help: (
        <div>
          <CheckOutlined /> <span>მინიმუმ 2 სიმბოლო</span>
        </div>
      ),
    });
  } else {
    setValidation({
      validateStatus: "success",
      help: (
        <div>
          <CheckOutlined /> <span>მინიმუმ 2 სიმბოლო</span>
        </div>
      ),
    });
  }
};

/*
  handles email input validations,
  requires event and setState to put result messages
*/
export const handleEmailValidations = (e, setValidation) => {
  const value = e.target.value;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@redberry\.ge$/;

  if (!value) {
    setValidation({
      validateStatus: "error",
      help: (
        <div>
          <CheckOutlined /> <span>სავალდებულო</span>
        </div>
      ),
    });
  } else if (!emailPattern.test(value)) {
    setValidation({
      validateStatus: "error",
      help: (
        <div>
          <CheckOutlined /> <span>უნდა მთავრდებოდეს @redberry.ge-თ</span>
        </div>
      ),
    });
  } else {
    setValidation({
      validateStatus: "success",
      help: (
        <div>
          <CheckOutlined /> <span>უნდა მთავრდებოდეს @redberry.ge-თ</span>
        </div>
      ),
    });
  }
};

/*
  handles number input validations,
  requires event, setState to put result messages
  and pattern string to show different result messages for different inputs
*/
export const handleNumberValidations = (e, setValidation, pattern) => {
  const value = e.target.value;
  const phonePattern = /^5\d{8}$/;
  const onlyNumberPattern = /^[0-9]*$/;

  if (!value) {
    setValidation({
      validateStatus: "error",
      help: (
        <div>
          <CheckOutlined /> <span>სავალდებულო</span>
        </div>
      ),
    });
  } else if (pattern === "phone" && !phonePattern.test(value)) {
    setValidation({
      validateStatus: "error",
      help: (
        <div>
          <CheckOutlined />{" "}
          <span>ნუმერული სიმბოლოები და ფორმატის 5XXXXXXXX</span>
        </div>
      ),
    });
  } else if (pattern === "number" && !onlyNumberPattern.test(value)) {
    setValidation({
      validateStatus: "error",
      help: (
        <div>
          <CheckOutlined /> <span>ნუმერული სიმბოლოები</span>
        </div>
      ),
    });
  } else if (pattern === "bedrooms" && !onlyNumberPattern.test(value)) {
    setValidation({
      validateStatus: "error",
      help: (
        <div>
          <CheckOutlined /> <span>ნუმერული სიმბოლოები</span>
        </div>
      ),
    });
  } else if (pattern === "bedrooms" && value > 255) {
    setValidation({
      validateStatus: "error",
      help: (
        <div>
          <CheckOutlined /> <span>ნუმერული სიმბოლოები (მაქსიმუმი 255)</span>
        </div>
      ),
    });
  } else {
    setValidation({
      validateStatus: "success",
      help: (
        <div>
          <CheckOutlined />{" "}
          <span>
            {pattern === "number" || pattern === "bedrooms"
              ? "ნუმერული სიმბოლოები"
              : "ნუმერული სიმბოლოები და ფორმატის 5XXXXXXXX"}
          </span>
        </div>
      ),
    });
  }
};

/*
  handles select input validations,
  requires event and setState to put result messages
*/
export const handleSelectValidations = (e, setValidation) => {
  const value = e;

  if (!value) {
    setValidation({
      validateStatus: "error",
      help: (
        <div>
          <CheckOutlined /> <span>სავალდებულო</span>
        </div>
      ),
    });
  } else {
    setValidation({
      validateStatus: "success",
      help: "",
    });
  }
};

/*
  handles textarea validations,
  requires event and setState to put result messages
*/
export const handleTextValidations = (e, setValidation) => {
  const value = e.trim();
  const wordCount = value.split(/\s+/).length;

  if (!value) {
    setValidation({
      validateStatus: "error",
      help: (
        <div>
          <CheckOutlined /> <span>სავალდებულო</span>
        </div>
      ),
    });
  } else if (wordCount < 5) {
    setValidation({
      validateStatus: "error",
      help: (
        <div>
          <CheckOutlined /> <span>მინიმუმ 5 სიტყვა</span>
        </div>
      ),
    });
  } else {
    setValidation({
      validateStatus: "success",
      help: (
        <div>
          <CheckOutlined /> <span>მინიმუმ 5 სიტყვა</span>
        </div>
      ),
    });
  }
};

/*
  handles image upload input validations,
  requires fileList object of uploaded image,
  setState to upload result messages,
  setUpload state which becomes true after uploading image,
  and also converts image object to binary string and saves it to setImgBinary state
*/
export const handleImageValidations = (
  fileList,
  setValidation,
  setIsUploaded,
  setImgBinary
) => {
  if (fileList.length === 0) {
    setValidation({
      validateStatus: "error",
      help: (
        <div className="image-validation-msg">
          <CheckOutlined /> <span>სავალდებულო</span>
        </div>
      ),
    });
  } else {
    setValidation({
      validateStatus: "success",
      help: (
        <div className="image-validation-msg">
          <CheckOutlined /> <span>სურათი ატვირთულია</span>
        </div>
      ),
    });

    // Convert image file to binary
    const file = fileList[0].originFileObj;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result;
        const blob = new Blob([arrayBuffer], { type: file.type });
        setImgBinary(blob);
      };
      reader.readAsArrayBuffer(file);
    }
  }
  setIsUploaded(fileList.length > 0);
};
