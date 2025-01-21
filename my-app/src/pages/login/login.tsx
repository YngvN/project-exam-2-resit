import { useState } from "react";

import CreateUser from "./create-user/createUser";
import LoginUser from "./login-user/loginUser";


import { CSSTransition, SwitchTransition } from "react-transition-group";
import "../../structure/main/FadeTransitionWrapper.scss";

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
        </div>
    );
}

export default Login;
