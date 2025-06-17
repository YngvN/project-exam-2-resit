import React from "react";
import XIcon from "../../icons/xIcon/xIcon";
import "./messageModalComponent.scss";

interface MessageModalComponentProps {
    isOpen: boolean;
    onClose: () => void;
    messages: string[]; // array of messages to display
}

/**
 * A modal component for displaying user-relevant messages.
 * Appears in the center of the screen and includes an XIcon to close.
 *
 * @param {boolean} isOpen - Controls visibility of the modal.
 * @param {() => void} onClose - Function to close the modal.
 * @param {string[]} messages - List of messages to show in the modal.
 */
const MessageModalComponent: React.FC<MessageModalComponentProps> = ({ isOpen, onClose, messages }) => {
    if (!isOpen) return null;

    return (
        <div className="message-modal-overlay" onClick={onClose}>
            <div className="message-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <XIcon onClick={onClose} />
                </div>
                <div className="modal-body">
                    {messages.length > 0 ? (
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
