import React, { useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { Outlet, useLocation } from 'react-router-dom';
import ModalComponent from '../../components/modal/modalComponent';
import MessageModalComponent from '../../components/modal/messageModal/messageModalComponent';

import './FadeTransitionWrapper.scss';
import './main.scss';

/**
 * Main layout wrapper for the Holidaze application.
 *
 * Features:
 * - Applies a fade transition between route changes using `react-transition-group`.
 * - Wraps routed content with <Outlet />.
 * - Includes global modals: a standard `ModalComponent` and a `MessageModalComponent`.
 * 
 */
const Main: React.FC = () => {
    const location = useLocation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

    const [messages] = useState<string[]>([
        ""
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

            <ModalComponent isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <button onClick={() => setIsModalOpen(false)} className="close-modal-button">
                    Close Modal
                </button>
            </ModalComponent>

            <MessageModalComponent
                isOpen={isMessageModalOpen}
                onClose={() => setIsMessageModalOpen(false)}
                messages={messages}
            />
        </>
    );
};

export default Main;
