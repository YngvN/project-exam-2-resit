import React, { useState } from "react";

import CreateUser from "./create-user/createUser";
import LoginUser from "./login-user/loginUser";
import LogoComponent from "../../components/logo/logoComponent";
import ModalComponent from "../../components/modal/modalComponent";

import { Header } from "../../structure/header/header";

import { CSSTransition, SwitchTransition } from "react-transition-group";
import "../../structure/main/FadeTransitionWrapper.scss";

function Login() {
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div>
            <SwitchTransition>
                <CSSTransition
                    key={isLoginForm ? "login" : "create"}
                    classNames="fade"
                    timeout={100}
                >
                    <div>
                        {isLoginForm ? (
                            <div className="fade-wrapper">
                                <LoginUser />
                                <button
                                    onClick={() => setIsLoginForm(false)}
                                    className="create-account-button"
                                >
                                    New? Create account here
                                </button>
                            </div>
                        ) : (
                            <div>
                                <CreateUser />
                                <button
                                    onClick={() => setIsLoginForm(true)}
                                    className="login-account-button"
                                >
                                    Already have an account? Log in
                                </button>
                            </div>
                        )}
                    </div>
                </CSSTransition>
            </SwitchTransition>

            <ModalComponent isOpen={isModalOpen} onClose={closeModal}>
                <h2>Welcome to the Modal!</h2>
                <p>This is where you can add content or forms.</p>
                <button onClick={closeModal} className="close-modal-button">
                    Close Modal
                </button>
            </ModalComponent>
        </div>
    );
}

export default Login;
