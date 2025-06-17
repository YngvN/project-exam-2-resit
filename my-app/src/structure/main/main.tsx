import React, { useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { Outlet, useLocation } from 'react-router-dom';
import ModalComponent from '../../components/modal/modalComponent';
import MessageModalComponent from '../../components/modal/messageModal/messageModalComponent';

import './FadeTransitionWrapper.scss';
import './main.scss';

const Main: React.FC = () => {
    const location = useLocation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

    const [messages] = useState<string[]>([
        "Welcome back!",
        "You have 2 new notifications.",
        "Your profile was updated successfully."
    ]);

    return (
        <>
            <SwitchTransition>
                <CSSTransition
                    key={location.pathname}
                    classNames="fade"
                    timeout={100}
                    unmountOnExit
                >
                    <div className="fade-wrapper">
                        <Outlet />
                    </div>
                </CSSTransition>
            </SwitchTransition>

            {/* Test buttons */}
            <button className="test-modal-button" onClick={() => setIsModalOpen(true)}>
                Open Content Modal
            </button>

            <button className="test-modal-button" onClick={() => setIsMessageModalOpen(true)}>
                Open Message Modal
            </button>

            {/* Content Modal */}
            <ModalComponent isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2>Welcome to the Modal!</h2>
                <p>This is where you can add content or forms.</p>
                <button onClick={() => setIsModalOpen(false)} className="close-modal-button">
                    Close Modal
                </button>
            </ModalComponent>

            {/* Message Modal */}
            <MessageModalComponent
                isOpen={isMessageModalOpen}
                onClose={() => setIsMessageModalOpen(false)}
                messages={messages}
            />
        </>
    );
};

export default Main;
