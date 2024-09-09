import type { StoryObj } from '@storybook/react';
declare const meta: {
    title: string;
    component: ({ user, onLogin, onLogout, onCreateAccount }: import("./Header").HeaderProps) => import("react").JSX.Element;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        onLogin: import("@vitest/spy").Mock<[], void>;
        onLogout: import("@vitest/spy").Mock<[], void>;
        onCreateAccount: import("@vitest/spy").Mock<[], void>;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const LoggedIn: Story;
export declare const LoggedOut: Story;
