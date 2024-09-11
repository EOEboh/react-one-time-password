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

<!-- Customize resend timer and button -->

```
import React, { useState } from "react";
import OTPInput from "./OTPInput"; // Adjust the import path as necessary

const OTPVerification: React.FC = () => {
  const [otp, setOtp] = useState("");

  const handleOtpChange = (newOtp: string) => {
    setOtp(newOtp);
  };

  const handleResend = () => {
    console.log("Resend OTP triggered");
    // Add your resend logic here, e.g., making an API call to resend the OTP
  };

  const customRenderResendContainer = (children: React.ReactNode) => (
    <div style={{ marginTop: "1rem", textAlign: "center" }}>{children}</div>
  );

  const customRenderResendButton = (
    onClick: () => void,
    disabled: boolean,
    timer: number
  ) => (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "0.5rem 1rem",
        backgroundColor: disabled ? "#ccc" : "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {disabled ? `Resend OTP in ${timer} seconds` : "Resend OTP"}
    </button>
  );

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "0 auto" }}>
      <h2>OTP Verification</h2>
      <OTPInput
        numberOfInputs={6}
        onChange={handleOtpChange}
        inputWidth="2.5rem"
        inputHeight="3rem"
        focusColor="#007bff"
        borderRadius="4px"
        resendTimeout={60}
        onResend={handleResend}
        renderResendContainer={customRenderResendContainer}
        renderResendButton={customRenderResendButton}
      />
      <p>Entered OTP: {otp}</p>
    </div>
  );
};

export default OTPVerification;
```
