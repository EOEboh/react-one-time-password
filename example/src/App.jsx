import OtpInput from "../../src/OTPInput";
import "./App.css";
function App() {
  return (
    <>
      <OtpInput
        numberOfInputs={6}
        classNames={{ input: "w-12 h-12 text-center border rounded-md" }}
      />
      <h2 className="text-3xl font-bold underline">Hey</h2>
    </>
  );
}

export default App;
