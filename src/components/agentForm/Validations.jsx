import { CheckOutlined } from "@ant-design/icons";

export const handleNameChange = (e, setValidation) => {
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

export const handleLastNameChange = (e, setValidation) => {
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

export const handleEmailChange = (e, setValidation) => {
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

export const handlePhoneNumberChange = (e, setValidation) => {
  const value = e.target.value;
  const phonePattern = /^5\d{8}$/;

  if (!value) {
    setValidation({
      validateStatus: "error",
      help: (
        <div>
          <CheckOutlined /> <span>სავალდებულო</span>
        </div>
      ),
    });
  } else if (!phonePattern.test(value)) {
    setValidation({
      validateStatus: "error",
      help: (
        <div>
          <CheckOutlined />{" "}
          <span>ნუმერული სიმბოლოები და ფორმატის 5XXXXXXXX</span>
        </div>
      ),
    });
  } else {
    setValidation({
      validateStatus: "success",
      help: (
        <div>
          <CheckOutlined />{" "}
          <span>ნუმერული სიმბოლოები და ფორმატის 5XXXXXXXX</span>
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
