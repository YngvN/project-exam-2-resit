import { useState } from "react";

import CreateUser from "./create-user/createUser";
import LoginUser from "./login-user/loginUser";
import "./login.scss"


import { CSSTransition, SwitchTransition } from "react-transition-group";
import "../../structure/main/FadeTransitionWrapper.scss";

/**
 * Login component
 *
 * Renders a login/create account toggle interface with smooth fade transitions.
 * - Displays either the LoginUser or CreateUser form
 * - Uses SwitchTransition + CSSTransition for animated swapping
 * - Allows users to toggle between login and registration
 */

function Login() {
    const [isLoginForm, setIsLoginForm] = useState(true);

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
                                    className="create-account-button btn-small btn-login"
                                >
                                    New? Create account here
                                </button>
                            </div>
                        ) : (
                            <div>
                                <CreateUser />
                                <button
                                    onClick={() => setIsLoginForm(true)}
                                    className="login-account-button btn-small btn-login"
                                >
                                    Already have an account? Log in
                                </button>
                            </div>
                        )}
                    </div>
                </CSSTransition>
            </SwitchTransition>
        </div>
    );
}

export default Login;
