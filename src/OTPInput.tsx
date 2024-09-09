import React, { useState, useEffect, CSSProperties } from "react";

type AllowedInputTypes = "password" | "text" | "number" | "tel";

interface OTPInputProps {
  numberOfInputs: number;
  onChange: (otp: string) => void;
  shouldAutoFocus?: boolean;
  inputStyle?: CSSProperties;
  containerStyle?: CSSProperties;
  inputType?: AllowedInputTypes;
}

const OTPInput: React.FC<OTPInputProps> = ({
  numberOfInputs,
  onChange,
  shouldAutoFocus = true,
  inputStyle,
  containerStyle,
  inputType = "text",
}) => {
  const [otp, setOtp] = useState<string[]>(Array(numberOfInputs).fill(""));

  useEffect(() => {
    if (shouldAutoFocus) {
      const firstInput = document.getElementById("otp-input");
      if (firstInput) firstInput.focus();
    }
  }, [shouldAutoFocus]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value;
    if (/[^0-9]/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    onChange(newOtp.join(""));

    if (value && element.nextSibling) {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  return (
    <div style={containerStyle}>
      {otp.map((_, index) => (
        <input
          id="otp-input"
          key={index}
          type={inputType}
          maxLength={1}
          value={otp[index]}
          onChange={(e) => handleChange(e.target, index)}
          onFocus={(e) => e.target.select()}
          style={{
            width: "2rem",
            marginRight: "0.5rem",
            textAlign: "center",
            ...inputStyle,
          }}
        />
      ))}
    </div>
  );
};

export default OTPInput;
