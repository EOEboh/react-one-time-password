# OTP Input Component

A customizable OTP (One-Time Password) input component for React.

- Keyboard support
- Custom separators support
- TypeScript compatible
- Resend and Timer Logic support
- Tailwind classes support

## Installation and Usage

To install:

```bash
npm i react-one-time-password
```

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
        // Custom styles for larger inputs
        inputStyle={{ width: "2em", height: "3em", fontSize: "1.5em" }}
      />
    </div>
  );
};

export default App;
```

Asides from the direct style props, you can also pass the `classNames` prop in case you need custom class names for styling or Tailwind classes.

The `classNames` prop supports the following keys:

- `container:` For the main container of the OTP input fields.

- `input:` For individual OTP input fields.

- `resend-button-container:` For the container of the resend button.

- `resend-button:` For the resend button itself.

- `input-separators:` For the separators between OTP input

```jsx
<OTPInput
  numberOfInputs={4}
  onChange={(otp) => console.log(otp)}
  // Tailwind classes
  classNames={{
    container: "flex items-center",
    input: "w-12 h-12 text-center border rounded-md",
    "resend-button-container": "mt-4",
    "resend-button": "px-4 py-2 bg-blue-500 text-white rounded",
    "input-separators": "mx-2",
  }}
/>
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

| Prop                     | Type                                                                                                                      | Default                                               | Description                                                  |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------ |
| `numberOfInputs`         | `number`                                                                                                                  | N/A                                                   | Number of OTP input fields.                                  |
| `onChange`               | `(otp: string) => void`                                                                                                   | N/A                                                   | Callback function to handle OTP change.                      |
| `inputWidth`             | `string`                                                                                                                  | `"1em"`                                               | Width of each OTP input field.                               |
| `inputHeight`            | `"auto" \| "fit-content" \| string`                                                                                       | `"3em"`                                               | Height of each OTP input field.                              |
| `disableAutoFocus`       | `boolean`                                                                                                                 | `false`                                               | Disable auto-focus on the first input field.                 |
| `borderColor`            | `string`                                                                                                                  | N/A                                                   | Border color of the input fields when focused.               |
| `borderRadius`           | `string`                                                                                                                  | N/A                                                   | Border radius of the input fields.                           |
| `showSeparators`         | `boolean`                                                                                                                 | `true`                                                | Show separators between input fields.                        |
| `renderCustomSeparators` | `() => React.ReactNode \| React.ReactNode`                                                                                | `() => <span style={{ margin: "0 0.5rem" }}>-</span>` | Custom separator component or function to render separators. |
| `inputStyle`             | `CSSProperties`                                                                                                           | N/A                                                   | Custom styles for the input fields.                          |
| `containerStyle`         | `CSSProperties`                                                                                                           | N/A                                                   | Custom styles for the container of the input fields.         |
| `inputType`              | `"password" \| "text" \| "tel"`                                                                                           | `"tel"`                                               | Type of the input fields.                                    |
| `inputMode`              | `"none" \| "numeric" \| "tel"`                                                                                            | `"numeric"`                                           | Input mode of the input fields.                              |
| `resendTimeout`          | `number`                                                                                                                  | `60`                                                  | Timeout in seconds before the resend button is enabled.      |
| `onResend`               | `() => void`                                                                                                              | N/A                                                   | Callback function to handle resend action.                   |
| `resendContainerStyle`   | `CSSProperties`                                                                                                           | N/A                                                   | Custom styles for the resend container.                      |
| `resendButtonStyle`      | `CSSProperties`                                                                                                           | N/A                                                   | Custom styles for the resend button.                         |
| `renderResendContainer`  | `(children: React.ReactNode) => React.ReactNode`                                                                          | N/A                                                   | Custom function to render the resend container.              |
| `renderResendButton`     | `(onClick: () => void, disabled: boolean, timer: number) => React.ReactNode`                                              | N/A                                                   | Custom function to render the resend button.                 |
| `showResendButton`       | `boolean`                                                                                                                 | `false`                                               | Show the resend button.                                      |
| `shouldDisableInput`     | `boolean`                                                                                                                 | `false`                                               | Disable input fields when OTP is complete.                   |
| `classNames`             | `{ container?: string; input?: string; "resend-button-container"?: string; "resend-button"?: string; "input-seperators"}` | N/A                                                   | Optional CSS class names for customizing component styles.   |

## Special Thanks to these Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/EOEboh"><img src="https://avatars.githubusercontent.com/u/63825997?v=4?s=100" width="100px;" alt="Emmanuel O. Eboh"/><br /><sub><b>Emmanuel O. Eboh</b></sub></a><br /><a href="https://github.com/EOEboh/react-one-time-password/commits?author=EOEboh" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/xosnrdev"><img src="https://avatars.githubusercontent.com/u/106241330?v=4?s=100" width="100px;" alt="Success Kingsley"/><br /><sub><b>Success Kingsley</b></sub></a><br /><a href="https://github.com/EOEboh/react-one-time-password/commits?author=xosnrdev" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://my-portofiio.vercel.app/"><img src="https://avatars.githubusercontent.com/u/102271199?v=4?s=100" width="100px;" alt="Rasheed"/><br /><sub><b>Rasheed</b></sub></a><br /><a href="https://github.com/EOEboh/react-one-time-password/commits?author=Demandtech" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
