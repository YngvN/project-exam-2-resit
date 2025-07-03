import React from "react";
interface FormContainerProps {
    title: string; 
    error?: string;
    children: React.ReactNode;
}

/**
 * A styled container for form sections, including a title and optional error message.
 *
 * @param {Object} props - Props for the FormContainer component.
 * @param {string} props.title - The title displayed at the top of the form.
 * @param {string} [props.error] - Optional error message to display.
 * @param {React.ReactNode} props.children - The form content to render inside the container.
 * @returns {JSX.Element} The rendered form container.
 */
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