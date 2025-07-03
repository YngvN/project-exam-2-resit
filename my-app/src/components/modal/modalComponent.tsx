import React, { useEffect } from "react";
import XIcon from "../icons/xIcon/xIcon";
import "./modalComponent.scss";

/**
 * ModalComponent
 *
 * A generic modal that renders children content in a centered overlay.
 * - Can be closed by clicking outside or pressing Escape
 * - Includes an XIcon close button
 * - Uses isOpen prop to control visibility
 */

function ModalComponent({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) {
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <XIcon onClick={onClose} />
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default ModalComponent;
export { };
