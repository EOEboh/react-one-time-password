# OTP Input Component

A customizable OTP (One-Time Password) input component for React.

## Installation

Take a look at the basic usage:

```jsx
import React, { useState } from "react";
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
```

If you wish to have a _Resend OTP_ and _Timer_ logic, you can enable the `showResendButton` prop and optionally pass any custom markup via the `renderResendContainer` and ` renderResendButton` as shown below:

```jsx
import React, { useState } from "react";
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
        showResendButton
        renderResendContainer={customRenderResendContainer}
        renderResendButton={customRenderResendButton}
      />
      <p>Entered OTP: {otp}</p>
    </div>
  );
}

export default App;
```

For more options, feel free to check out the props below:

| Prop                     | Type                                                                         | Default                                               | Description                                                  |
| ------------------------ | ---------------------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------ |
| `numberOfInputs`         | `number`                                                                     | N/A                                                   | Number of OTP input fields.                                  |
| `onChange`               | `(otp: string) => void`                                                      | N/A                                                   | Callback function to handle OTP change.                      |
| `inputWidth`             | `string`                                                                     | `"1em"`                                               | Width of each OTP input field.                               |
| `inputHeight`            | `"auto" \| "fit-content" \| string`                                          | `"3em"`                                               | Height of each OTP input field.                              |
| `disableAutoFocus`       | `boolean`                                                                    | `false`                                               | Disable auto-focus on the first input field.                 |
| `borderColor`            | `string`                                                                     | N/A                                                   | Border color of the input fields when focused.               |
| `borderRadius`           | `string`                                                                     | N/A                                                   | Border radius of the input fields.                           |
| `showSeparators`         | `boolean`                                                                    | `true`                                                | Show separators between input fields.                        |
| `renderCustomSeparators` | `() => React.ReactNode \| React.ReactNode`                                   | `() => <span style={{ margin: "0 0.5rem" }}>-</span>` | Custom separator component or function to render separators. |
| `inputStyle`             | `CSSProperties`                                                              | N/A                                                   | Custom styles for the input fields.                          |
| `containerStyle`         | `CSSProperties`                                                              | N/A                                                   | Custom styles for the container of the input fields.         |
| `inputType`              | `"password" \| "text" \| "tel"`                                              | `"tel"`                                               | Type of the input fields.                                    |
| `inputMode`              | `"none" \| "numeric" \| "tel"`                                               | `"numeric"`                                           | Input mode of the input fields.                              |
| `resendTimeout`          | `number`                                                                     | `60`                                                  | Timeout in seconds before the resend button is enabled.      |
| `onResend`               | `() => void`                                                                 | N/A                                                   | Callback function to handle resend action.                   |
| `resendContainerStyle`   | `CSSProperties`                                                              | N/A                                                   | Custom styles for the resend container.                      |
| `resendButtonStyle`      | `CSSProperties`                                                              | N/A                                                   | Custom styles for the resend button.                         |
| `renderResendContainer`  | `(children: React.ReactNode) => React.ReactNode`                             | N/A                                                   | Custom function to render the resend container.              |
| `renderResendButton`     | `(onClick: () => void, disabled: boolean, timer: number) => React.ReactNode` | N/A                                                   | Custom function to render the resend button.                 |
| `showResendButton`       | `boolean`                                                                    | `false`                                               | Show the resend button.                                      |
| `shouldDisableInput`     | `boolean`                                                                    | `false`                                               | Disable input fields when OTP is complete.                   |

## Special Thanks to these Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
