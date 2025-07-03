import React, { useEffect, useState } from "react";
import { makeRequest } from "../../utility/api/url";
import { getAuthData, updateUserData } from "../../utility/api/user";
import MessageModalComponent from "../../components/modal/messageModal/messageModalComponent";

import "./profile.scss";


/**
 * Profile
 *
 * Displays and allows the authenticated user to update their profile information.
 * Fetches profile data from the Holidaze API using the stored auth username.
 * Enables updates to bio, avatar, and banner via a modal form.
 * Uses `makeRequest` to handle API calls and `MessageModalComponent` for update form UI.
 */
function Profile() {
    const authData = getAuthData();
    const [user, setUser] = useState<any>(null);
    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
    const [bio, setBio] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [bannerUrl, setBannerUrl] = useState("");
    const [statusMessage, setStatusMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!authData?.username) return;

            try {
                const response = await makeRequest("holidaze/profiles", authData.username, "", "GET", null, {}, true);
                const userData = response?.data;
                setUser(userData);
                setBio(userData.bio || "");
                setAvatarUrl(userData.avatar?.url || "");
                setBannerUrl(userData.banner?.url || "");
            } catch (error) {
                setStatusMessage("Failed to load user profile.");
                console.error(error);
            }
        };

        fetchProfile();
    }, [authData?.username]);

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!authData?.username) {
            setStatusMessage("Missing user information.");
            return;
        }

        const payload = {
            ...(bio && { bio }),
            ...(avatarUrl && { avatar: { url: avatarUrl, alt: "Updated avatar" } }),
            ...(bannerUrl && { banner: { url: bannerUrl, alt: "Updated banner" } })
        };

        try {
            setLoading(true);
            await makeRequest(
                "holidaze/profiles",
                authData.username,
                "",
                "PUT",
                payload,
                {},
                true
            );

            const updatedResponse = await makeRequest("holidaze/profiles", authData.username, "", "GET", null, {}, true);
            updateUserData({ data: updatedResponse.data, meta: {} });
            setUser(updatedResponse.data);
            setStatusMessage("Profile updated successfully.");
            setTimeout(() => setIsMessageModalOpen(false), 1500);
        } catch (error) {
            setStatusMessage("Failed to update profile.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (!authData?.username) {
        return (
            <div className="profile">
                <h1 className="page-title">Profile</h1>
                <p>You are not logged in.</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="profile">
                <h1 className="page-title">Profile</h1>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="profile">
            <h1 className="page-title">Welcome, {user.name}!</h1>
            <div className="profile-info">
                <img src={user.avatar?.url} alt={user.avatar?.alt || "Profile avatar"} className="avatar" />
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Bio:</strong> {user.bio?.trim() ? user.bio : "No bio available"}</p>
            </div>
            {user.banner?.url && (
                <div className="profile-banner">
                    <img src={user.banner.url} alt={user.banner.alt || "Banner"} />
                </div>
            )}

            <button className="update-user-button btn-primary" onClick={() => setIsMessageModalOpen(true)}>
                Update User
            </button>

            <MessageModalComponent
                isOpen={isMessageModalOpen}
                onClose={() => setIsMessageModalOpen(false)}
            >
                <form className="form-group" onSubmit={handleSave}>
                    <h2>Update Profile</h2>
                    <label>
                        Bio:
                        <textarea value={bio} onChange={(e) => setBio(e.target.value)} disabled={loading} />
                    </label>
                    <label>
                        Avatar URL:
                        <input type="text" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} disabled={loading} />
                    </label>
                    <label>
                        Banner URL:
                        <input type="text" value={bannerUrl} onChange={(e) => setBannerUrl(e.target.value)} disabled={loading} />
                    </label>
                    <div className="modal-actions">
                        <button className="btn btn-primary" type="submit" disabled={loading}>Save</button>
                        <button className="btn btn-danger" type="button" onClick={() => setIsMessageModalOpen(false)} disabled={loading}>Cancel</button>
                    </div>
                    {statusMessage && <p className="status-message">{statusMessage}</p>}
                </form>
            </MessageModalComponent>
        </div>
    );
}

export default Profile;
