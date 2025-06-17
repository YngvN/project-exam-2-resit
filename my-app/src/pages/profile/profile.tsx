import React from "react";
import { getUserData } from "../../utility/api/user";

import "./profile.scss";

function Profile() {
    const user = getUserData();

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
                {user.bio && <p><strong>Bio:</strong> {user.bio}</p>}
            </div>
            {user.banner?.url && (
                <div className="profile-banner">
                    <img src={user.banner.url} alt={user.banner.alt || "Banner"} />
                </div>
            )}
        </div>
    );
}

export default Profile;