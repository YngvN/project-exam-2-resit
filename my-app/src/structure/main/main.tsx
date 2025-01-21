import React, { useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { Outlet, useLocation } from 'react-router-dom';
import ModalComponent from '../../components/modal/modalComponent';

import './FadeTransitionWrapper.scss';
import './main.scss';

const Main: React.FC = () => {
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

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

            <button className="test-modal-button" onClick={openModal}>
                Open Modal
            </button>

            <ModalComponent isOpen={isModalOpen} onClose={closeModal}>
                <h2>Welcome to the Modal!</h2>
                <p>This is where you can add content or forms.</p>
                <button onClick={closeModal} className="close-modal-button">
                    Close Modal
                </button>
            </ModalComponent>
        </>
    );
};

export default Main;
