import React from "react";
import "./loadingComponent.scss";

const LoadingComponent: React.FC = () => {
    return (
        <div className="loading-container">
            <div className="loading-bar"></div>
        </div>
    );
};

export default LoadingComponent;