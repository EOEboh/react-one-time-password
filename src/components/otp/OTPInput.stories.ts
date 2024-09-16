import type { Meta, StoryObj } from "@storybook/react/*";
import OTPInput from "../../OTPInput";

const meta: Meta<typeof OTPInput> = {
  component: OTPInput,
};

export default meta;
type Story = StoryObj<typeof OTPInput>;

export const Default: Story = {
  name: "I am the default look",
  args: {
    numberOfInputs: 6,
    onChange: (otp) => console.log("otp", otp),
    inputStyle: {},
    inputType: "tel",
    borderColor: "#6f8b6f",
    classNames: {},
  },
};

export const Four: Story = {
  args: {
    ...Default.args,
    numberOfInputs: 4,
  },
};
