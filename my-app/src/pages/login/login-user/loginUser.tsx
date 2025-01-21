import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeRequest } from "../../../utility/api/url";
import { storeUserData } from "../../../utility/api/user";
import FormContainer from "../../../components/containers/form/form";
import { PrimaryButton, SecondaryButton } from "../../../components/buttons/buttons";

function LoginUser() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        const credentials = {
            email,
            password,
        };

        try {
            const response = await makeRequest("auth/login", "", "", "POST", credentials, {}, false);

            if (response) {
                storeUserData(response, rememberMe);
                console.log("Login successful!", response);
                navigate("/home"); // Navigate to the home page on successful login
            }
        } catch (err) {
            setError("Login failed. Please check your credentials and try again.");
            console.error("Login error:", err);
        }
    };

    return (
        <FormContainer title="Log in" error={error}>
            <form className="login-form" onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        Remember me
                    </label>
                </div>
                <div className="button-container">
                    <PrimaryButton type="submit" label="Log in" className="login-button" />
                    <SecondaryButton label="Skip Login" />
                </div>
            </form>
        </FormContainer>
    );
}

export default LoginUser;
