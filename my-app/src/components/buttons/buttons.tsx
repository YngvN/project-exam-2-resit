import React from "react";

interface ButtonProps {
    label: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "danger" | "success";
    disabled?: boolean;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    type = "button",
    variant = "primary",
    disabled = false,
    className = "",
}) => {
    return (
        <button
            type={type}
            className={`btn btn-${variant} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export const PrimaryButton: React.FC<Omit<ButtonProps, "variant">> = (props) => (
    <Button {...props} variant="primary" />
);

export const SecondaryButton: React.FC<Omit<ButtonProps, "variant">> = (props) => (
    <Button {...props} variant="secondary" />
);

export const DangerButton: React.FC<Omit<ButtonProps, "variant">> = (props) => (
    <Button {...props} variant="danger" />
);

export const SuccessButton: React.FC<Omit<ButtonProps, "variant">> = (props) => (
    <Button {...props} variant="success" />
);

export default Button;
