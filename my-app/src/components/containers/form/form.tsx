import React from "react";
interface FormContainerProps {
    title: string; 
    error?: string;
    children: React.ReactNode;
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