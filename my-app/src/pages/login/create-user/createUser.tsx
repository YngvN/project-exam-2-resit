import React, { useState } from "react";
import { makeRequest } from "../../../utility/api/url";
import { useNavigate } from "react-router-dom";
import { getInputClass } from "../../../components/inputs/inputs";

import "../../../components/inputs/inputs.scss";

function CreateUser() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [venueManager, setVenueManager] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [usernameAvailability, setUsernameAvailability] = useState("");
    const [usernameTimer, setUsernameTimer] = useState<NodeJS.Timeout | null>(null);

    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [repeatPasswordError, setRepeatPasswordError] = useState("");
    const [avatarUrlError, setAvatarUrlError] = useState("");

    const navigate = useNavigate();

    const validateUsername = async (value: string): Promise<void> => {
        const regex = /^[a-zA-Z0-9_]+$/;
        setUsernameError(""); // Clear previous error
        setUsernameAvailability(""); // Clear previous availability state

        if (!value) return; // Skip search for empty input

        if (!regex.test(value)) {
            setUsernameError("Username can only contain letters, numbers, and underscores.");
            return;
        }

        if (usernameTimer) {
            clearTimeout(usernameTimer);
        }

        const timer = setTimeout(async () => {
            try {
                const response = await makeRequest("holidaze/profiles/search", "", "", "GET", null, { q: value }, true);
                const isAvailable = response.data.length === 0;
                setUsernameAvailability(isAvailable ? "Username is available" : "Username is already taken");
                if (!isAvailable) setUsernameError("Username is already taken");
            } catch (err) {
                setUsernameAvailability("Error checking username availability");
                console.error("Username availability error:", err);
            }
        }, 1000);

        setUsernameTimer(timer);
    };

    const validateEmail = (value: string): void => {
        const regex = /^[^\s@]+@stud\.noroff\.no$/;
        setEmailError(regex.test(value) ? "" : "Email must be a valid stud.noroff.no address.");
    };

    const validatePassword = (value: string): void => {
        setPasswordError(value.length >= 8 ? "" : "Password must be at least 8 characters long.");
    };

    const validateRepeatPassword = (value: string): void => {
        setRepeatPasswordError(value === password ? "" : "Passwords do not match.");
    };

    const validateAvatarUrl = (value: string): void => {
        try {
            new URL(value);
            setAvatarUrlError("");
        } catch {
            setAvatarUrlError(value ? "Avatar URL must be a valid URL." : "");
        }
    };

    const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        validateUsername(username);
        validateEmail(email);
        validatePassword(password);
        validateRepeatPassword(repeatPassword);
        validateAvatarUrl(avatarUrl);

        if (usernameError || emailError || passwordError || repeatPasswordError || avatarUrlError) {
            return;
        }

        const userDetails = {
            name: username,
            email,
            password,
            avatar: avatarUrl ? { url: avatarUrl } : undefined,
            venueManager,
        };

        try {
            const response = await makeRequest("auth/register", "", "", "POST", userDetails, {}, false);

            if (response) {
                setSuccess(true);
                console.log("User created successfully!", response);
                navigate("/home");
            }
        } catch (err: any) {
            if (err.errors && Array.isArray(err.errors)) {
                setError(err.errors.map((e: any) => e.message).join(" "));
            } else if (err.message) {
                setError(err.message);
            } else {
                setError("Failed to create user. Please try again.");
            }
            console.error("Create user error:", err);
        }
    };

    return (
        <div className="create-user-container">
            <h1 className="page-title">Create User</h1>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">User created successfully!</p>}
            <form className="create-user-form" onSubmit={handleCreateUser}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            validateUsername(e.target.value);
                        }}
                        placeholder="Enter your username"
                        required
                        className={getInputClass(username, usernameError, usernameAvailability)}
                    />
                    {usernameError && <p className="error-message">{usernameError}</p>}
                    {usernameAvailability && !usernameError && (
                        <p className="availability-message">{usernameAvailability}</p>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            validateEmail(e.target.value);
                        }}
                        placeholder="Enter your email"
                        required
                        className={getInputClass(email, emailError, "")}
                    />
                    {emailError && <p className="error-message">{emailError}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            validatePassword(e.target.value);
                        }}
                        placeholder="Enter your password"
                        required
                        className={getInputClass(password, passwordError, "")}
                    />
                    {passwordError && <p className="error-message">{passwordError}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="repeatPassword">Repeat Password</label>
                    <input
                        type="password"
                        id="repeatPassword"
                        name="repeatPassword"
                        value={repeatPassword}
                        onChange={(e) => {
                            setRepeatPassword(e.target.value);
                            validateRepeatPassword(e.target.value);
                        }}
                        placeholder="Repeat your password"
                        required
                        className={getInputClass(repeatPassword, repeatPasswordError, "")}
                    />
                    {repeatPasswordError && <p className="error-message">{repeatPasswordError}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="avatarUrl">Avatar URL</label>
                    <input
                        type="url"
                        id="avatarUrl"
                        name="avatarUrl"
                        value={avatarUrl}
                        onChange={(e) => {
                            setAvatarUrl(e.target.value);
                            validateAvatarUrl(e.target.value);
                        }}
                        placeholder="Enter avatar image URL"
                        className={getInputClass(avatarUrl, avatarUrlError, "")}
                    />
                    {avatarUrlError && <p className="error-message">{avatarUrlError}</p>}
                </div>
                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={venueManager}
                            onChange={(e) => setVenueManager(e.target.checked)}
                        />
                        I am a venue manager
                    </label>
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
                <button type="submit" className="create-user-button">Create User</button>
            </form>
        </div>
    );
}

export default CreateUser;
