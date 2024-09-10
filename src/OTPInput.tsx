import React, { useState, useEffect, CSSProperties } from "react";

type AllowedInputTypes = "password" | "text" | "number" | "tel";
type AllowedInputHeight = "auto" | "fit-content" | string;

interface OTPInputProps {
  numberOfInputs: number;
  onChange: (otp: string) => void;
  inputWidth: string;
  inputHeight: AllowedInputHeight;
  disableAutoFocus?: boolean;
  focusColor?: string;
  borderRadius?: string;
  showSeparators?: boolean;
  renderCustomSeparators?: () => React.ReactNode | React.ReactNode;
  inputStyle?: CSSProperties;
  containerStyle?: CSSProperties;
  inputType?: AllowedInputTypes;
}

const OTPInput: React.FC<OTPInputProps> = ({
  numberOfInputs,
  onChange,
  inputWidth = "2.5rem",
  inputHeight = "3rem",
  disableAutoFocus = false,
  focusColor,
  borderRadius,
  showSeparators = true,
  renderCustomSeparators = () => <span style={{ margin: "0 0.5rem" }}>-</span>,
  inputStyle,
  containerStyle,
  inputType = "text",
}) => {
  const [otp, setOtp] = useState<string[]>(Array(numberOfInputs).fill(""));
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!disableAutoFocus) {
      const firstInput = document.getElementById("otp-input-0");
      if (firstInput) firstInput.focus();
    }
  }, [disableAutoFocus]);

  const handleOnFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value;
    if (/[^0-9]/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    onChange(newOtp.join(""));

    // maintain next focus even with `renderCustomSeparators`
    if (value) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) {
        (nextInput as HTMLInputElement).focus();
      }
    }
  };

  return (
    <div style={containerStyle}>
      {otp.map((_, index) => (
        <React.Fragment key={index}>
          <input
            id={`otp-input-${index}`}
            key={index}
            type={inputType}
            maxLength={1}
            value={otp[index]}
            onChange={(e) => handleChange(e.target, index)}
            onFocus={handleOnFocus}
            onBlur={handleBlur}
            style={{
              width: inputWidth,
              height: inputHeight,
              marginRight: "0.5rem",
              textAlign: "center",
              borderRadius,
              borderColor: isFocused && focusColor ? focusColor : undefined,
              ...inputStyle,
            }}
          />
          {showSeparators &&
            index < numberOfInputs - 1 &&
            (typeof renderCustomSeparators === "function"
              ? renderCustomSeparators()
              : renderCustomSeparators)}
        </React.Fragment>
      ))}
    </div>
  );
};

export default OTPInput;
