import type { Meta, StoryObj } from "@storybook/react/*";
import { OTPInput } from "../..";

const meta: Meta<typeof OTPInput> = {
  component: OTPInput,
};

export default meta;
type Story = StoryObj<typeof OTPInput>;

export const Default: Story = {
  name: "I am the default look",
  args: {
    inputLength: 6,
    onChange: (otp) => console.log("otp", otp),
    inputStyle: {},
    inputType: "tel",
    borderColor: "#6f8b6f",
  },
};

export const Four: Story = {
  args: {
    ...Default.args,
    inputLength: 4,
  },
};
