import { CheckOutlined } from "@ant-design/icons";

export const handleAddressChange = (e, setValidation) => {
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

export const handleZipCodeChange = (e, setValidation) => {
  const value = e.target.value;
  const pattern = /^[0-9]*$/;

  if (!value) {
    setValidation({
      validateStatus: "error",
      help: (
        <div>
          <CheckOutlined /> <span>სავალდებულო</span>
        </div>
      ),
    });
  } else if (!pattern.test(value)) {
    setValidation({
      validateStatus: "error",
      help: (
        <div>
          <CheckOutlined /> <span>ნუმერული სიმბოლოები</span>
        </div>
      ),
    });
  } else {
    setValidation({
      validateStatus: "success",
      help: (
        <div>
          <CheckOutlined /> <span>ნუმერული სიმბოლოები</span>
        </div>
      ),
    });
  }
};

export const handleRegionChange = (e, setValidation) => {
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
      help: (
        <div>
          <CheckOutlined /> <span>რეგიონი</span>
        </div>
      ),
    });
  }
};

export const handleCityChange = (e, setValidation) => {
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
      help: (
        <div>
          <CheckOutlined /> <span>ქალაქი</span>
        </div>
      ),
    });
  }
};

export const handlePriceValidation = (e, setValidation) => {
  const value = e.target.value;
  const pattern = /^[0-9]*$/;

  if (!value) {
    setValidation({
      validateStatus: "error",
      help: (
        <div>
          <CheckOutlined /> <span>სავალდებულო</span>
        </div>
      ),
    });
  } else if (!pattern.test(value)) {
    setValidation({
      validateStatus: "error",
      help: (
        <div>
          <CheckOutlined /> <span>ნუმერული სიმბოლოები</span>
        </div>
      ),
    });
  } else {
    setValidation({
      validateStatus: "success",
      help: (
        <div>
          <CheckOutlined /> <span>ნუმერული სიმბოლოები</span>
        </div>
      ),
    });
  }
};

export const handleAreaValidation = (e, setValidation) => {
  const value = e.target.value;
  const pattern = /^[0-9]*$/;

  if (!value) {
    setValidation({
      validateStatus: "error",
      help: (
        <div>
          <CheckOutlined /> <span>სავალდებულო</span>
        </div>
      ),
    });
  } else if (!pattern.test(value)) {
    setValidation({
      validateStatus: "error",
      help: (
        <div>
          <CheckOutlined /> <span>ნუმერული სიმბოლოები</span>
        </div>
      ),
    });
  } else {
    setValidation({
      validateStatus: "success",
      help: (
        <div>
          <CheckOutlined /> <span>ნუმერული სიმბოლოები</span>
        </div>
      ),
    });
  }
};

export const handleBedroomsChange = (e, setValidation) => {
  const value = e.target.value;
  const pattern = /^[0-9]*$/; // Only allows whole numbers

  if (!value) {
    setValidation({
      validateStatus: "error",
      help: (
        <div>
          <CheckOutlined /> <span>სავალდებულო</span>
        </div>
      ),
    });
  } else if (!pattern.test(value)) {
    setValidation({
      validateStatus: "error",
      help: (
        <div>
          <CheckOutlined /> <span>მხოლოდ ნუმერული და მთელი რიცხვები</span>
        </div>
      ),
    });
  } else {
    setValidation({
      validateStatus: "success",
      help: (
        <div>
          <CheckOutlined /> <span>ნუმერული სიმბოლოები</span>
        </div>
      ),
    });
  }
};

export const handleDescriptionValidation = (e, setValidation) => {
  const value = e.trim();
  const wordCount = value.split(/\s+/).length; // Split by spaces and count words

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

export const handleImageUploadChange = (
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
