# OTPInput Component

A customizable OTP (One-Time Password) input component for React.

## Installation

To install the component, you can use npm or yarn:

````bash
npm install react-one-time-password
```


```jsx
import React, { useState } from "react";
import "./App.css";
import { OTPInput } from "react-one-time-password";

const App: React.FC = () => {
  const handleOtpChange = (otp: string) => {
    console.log("OTP:", otp);
  };

  return (
    <div>
      <h1>Enter OTP</h1>
      <OTPInput
        numberOfInputs={6}
        onChange={handleOtpChange}
        inputStyle={{ width: "2em", height: "3em", fontSize: "1.5em" }} // Custom styles for larger inputs
      />
    </div>
  );
};

export default App;
````

```jsx
import React, { useState } from "react";
import "./App.css";
import { OTPInput } from "react-one-time-password";

function App() {
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
    <div>
      <h2>OTP Verification</h2>
      <OTPInput
        numberOfInputs={6}
        onChange={handleOtpChange}
        inputWidth="1em"
        inputHeight="3em"
        borderColor="#007bff"
        borderRadius="4px"
        resendTimeout={60}
        onResend={handleResend}
        renderResendContainer={customRenderResendContainer}
        renderResendButton={customRenderResendButton}
      />
      <p>Entered OTP: {otp}</p>
    </div>
  );
}

export default App;
```

Prop Type Default Description
numberOfInputs number Required Number of OTP inputs.
onChange (otp: string) => void Required Callback function when OTP changes.
inputWidth string "1em" Width of each input.
inputHeight "auto" | "fit-content" | string "3em" Height of each input.
disableAutoFocus boolean false Disable auto-focus on the first input.
borderColor string undefined Border color of the input when focused.
borderRadius string undefined Border radius of the input.
showSeparators boolean true Show separators between inputs.
renderCustomSeparators () => React.ReactNode | React.ReactNode () => <span style={{ margin: "0 0.5rem" }}>-</span> Custom separator component.
inputStyle CSSProperties undefined Custom styles for the input.
containerStyle CSSProperties undefined Custom styles for the container.
inputType "password" | "text" | "tel" "tel" Type of the input.
inputMode "none" | "numeric" | "tel" "numeric" Input mode of the input.
resendTimeout number 60 Timeout in seconds for the resend button.
onResend () => void undefined Callback function when resend button is clicked.
resendContainerStyle CSSProperties undefined Custom styles for the resend container.
resendButtonStyle CSSProperties undefined Custom styles for the resend button.
renderResendContainer (children: React.ReactNode) => React.ReactNode undefined Custom render function for the resend container.
renderResendButton (onClick: () => void, disabled: boolean, timer: number) => React.ReactNode undefined Custom render function for the resend button.
showResendButton boolean true Show the resend button.
shouldDisableInput boolean false Disable input when OTP is complete.
License
This project is licensed under the MIT License.
