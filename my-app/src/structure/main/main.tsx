import React from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { Outlet, useLocation } from 'react-router-dom';
import './FadeTransitionWrapper.scss';

const Main: React.FC = () => {
    const location = useLocation();

    return (
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
    );
};

export default Main;
