import React, { ReactNode } from "react";
import XIcon from "../../icons/xIcon/xIcon";
import "./messageModalComponent.scss";

interface MessageModalComponentProps {
    isOpen: boolean;
    onClose: () => void;
    messages?: string[];
    children?: ReactNode;
}

/**
 * A modal component for displaying user-relevant messages or custom content.
 * Appears in the center of the screen and includes an XIcon to close.
 *
 * @param {boolean} isOpen - Controls visibility of the modal.
 * @param {() => void} onClose - Function to close the modal.
 * @param {string[]} [messages] - Optional list of messages to show.
 * @param {ReactNode} [children] - Optional custom content to render.
 */
const MessageModalComponent: React.FC<MessageModalComponentProps> = ({ isOpen, onClose, messages = [], children }) => {
    if (!isOpen) return null;

    return (
        <div className="message-modal-overlay" onClick={onClose}>
            <div className="message-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <XIcon onClick={onClose} />
                </div>
                <div className="modal-body">
                    {children ? (
                        children
                    ) : messages.length > 0 ? (
                        <ul className="message-list">
                            {messages.map((msg, index) => (
                                <li key={index}>{msg}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No new messages.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessageModalComponent;
