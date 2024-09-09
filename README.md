```import React from "react";
import OTPInput from "./OTPInput";

const App: React.FC = () => {
  const handleOtpChange = (otp: string) => {
    console.log("OTP:", otp);
  };

  return (
    <div>
      <h1>Enter OTP</h1>
      <OTPInput
        length={6}
        onChange={handleOtpChange}
        inputStyle={{ width: "3rem", height: "3rem", fontSize: "1.5rem" }} // Custom styles for larger inputs
        focusColor="blue" // Custom focus color
      />
    </div>
  );
};

export default App;
```
