import React, { useState, useEffect, CSSProperties } from "react";

type AllowedInputTypes = "password" | "text" | "number" | "tel";

interface OTPInputProps {
  length: number;
  onChange: (otp: string) => void;
  autoFocus?: boolean;
  inputStyle?: CSSProperties;
  containerStyle?: CSSProperties;
  inputType?: AllowedInputTypes;
}

const OTPInput: React.FC<OTPInputProps> = ({
  length,
  onChange,
  autoFocus = false,
  inputStyle,
  containerStyle,
  inputType = "text",
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));

  useEffect(() => {
    if (autoFocus) {
      const firstInput = document.querySelector("input");
      if (firstInput) firstInput.focus();
    }
  }, [autoFocus]);

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
