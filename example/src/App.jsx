import { OTPInput } from "../../src/index.tsx";
import "./App.css";
function App() {
  return (
    <>
      <OTPInput
        numberOfInputs={6}
        classNames={{
          container: "flex items-center",
          input: "w-12 h-12 text-center border rounded-2xl",
          "resend-button-container": "mt-4",
          "resend-button": "px-4 py-2 bg-blue-500 text-white rounded",
          "input-separators": "mx-2",
        }}
      />
    </>
  );
}

export default App;
