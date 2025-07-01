import React, { useState } from "react";
import { makeRequest } from "../../utility/api/url";
import { getUserData } from "../../utility/api/user";
import MessageModalComponent from "../../components/modal/messageModal/messageModalComponent";

import "./profile.scss";

function Profile() {
    const user = getUserData();
    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
    const [bio, setBio] = useState(user?.bio || "");
    const [avatarUrl, setAvatarUrl] = useState(user?.avatar?.url || "");
    const [bannerUrl, setBannerUrl] = useState(user?.banner?.url || "");
    const [statusMessage, setStatusMessage] = useState("");

    const handleSave = async () => {
        if (!user?.name) {
            setStatusMessage("Missing user information.");
            return;
        }

        const payload = {
            ...(bio && { bio }),
            ...(avatarUrl && { avatar: { url: avatarUrl, alt: "Updated avatar" } }),
            ...(bannerUrl && { banner: { url: bannerUrl, alt: "Updated banner" } })
        };

        try {
            await makeRequest(
                "holidaze/profiles",
                user.name,
                "", // no subcategory
                "PUT",
                payload,
                {}, // no query params
                true
            );
            setStatusMessage("Profile updated successfully.");
        } catch (error) {
            setStatusMessage("Failed to update profile.");
        }
    };

    if (!user) {
        return (
            <div className="profile">
                <h1 className="page-title">Profile</h1>
                <p>You are not logged in.</p>
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

            <button className="update-user-button" onClick={() => setIsMessageModalOpen(true)}>
                Update User
            </button>

            <MessageModalComponent
                isOpen={isMessageModalOpen}
                onClose={() => setIsMessageModalOpen(false)}
            >
                <form className="form-group">
                    <h2>Update Profile</h2>
                    <label>
                        Bio:
                        <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
                    </label>
                    <label>
                        Avatar URL:
                        <input type="text" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} />
                    </label>
                    <label>
                        Banner URL:
                        <input type="text" value={bannerUrl} onChange={(e) => setBannerUrl(e.target.value)} />
                    </label>
                    <div className="modal-actions">
                        <button className="btn btn-primary" onClick={handleSave}>Save</button>
                        <button className="btn btn-secondary" onClick={() => setIsMessageModalOpen(false)}>Cancel</button>
                    </div>
                    {statusMessage && <p className="status-message">{statusMessage}</p>}
                </form>
            </MessageModalComponent>
        </div>
    );
}

export default Profile;
