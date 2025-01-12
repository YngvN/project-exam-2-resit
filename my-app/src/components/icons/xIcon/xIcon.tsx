import React from "react";
import "./xIcon.scss";

interface XIconProps {
    onClick: () => void;
}

function XIcon({ onClick }: XIconProps) {
    return (
        <div className="x-icon" onClick={onClick}>
            <div className="line line-1"></div>
            <div className="line line-2"></div>
        </div>
    );
}

export default XIcon;
