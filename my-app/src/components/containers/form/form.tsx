import React from "react";
import "./form.scss"; // Optional: Create form.scss for custom styles if needed

interface FormContainerProps {
    title: string; // Title of the form
    error?: string; // Optional error message
    children: React.ReactNode; // Form content (e.g., inputs, buttons)
}

const FormContainer: React.FC<FormContainerProps> = ({ title, error, children }) => {
    return (
        <div className="form-container">
            <h1 className="form-title">{title}</h1>
            {error && <p className="form-error">{error}</p>}
            {children}
        </div>
    );
};

export default FormContainer;