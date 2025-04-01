import "./Profile.css";

import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

import userService from "../../services/userService.js";

import ProfileEdit from "../profile-edit/ProfileEdit.jsx";
import { ErrorContext } from "../../contexts/ErrorContext.jsx";

export default function Profile() {
    const [profile, setProfile] = useState({});
    const [showEditProfile, setShowEditProfile] = useState(false);
    const { showError } = useContext(ErrorContext);

    useEffect(() => {
        userService
            .getProfile()
            .then((userData) => {
                setProfile(userData);
            })
            .catch((error) => showError(error.message));
    }, [showError]);

    const closeEditProfileClickHandler = () => {
        setShowEditProfile(false);
    };

    const saveEditProfileClickHandler = async () => {
        setShowEditProfile(false);
    };

    const editProfileClickHandler = () => {
        setShowEditProfile(true);
    };

    return (
        <>
            {showEditProfile && (
                <ProfileEdit
                    onClose={closeEditProfileClickHandler}
                    onSave={saveEditProfileClickHandler}
                    setProfile={setProfile}
                />
            )}

            <Helmet>
                <title>Profile - Machina</title>
            </Helmet>

            <div className="profile-wrapper">
                <h1>Your Profile</h1>
                <div className="profile-container">
                    <div className="profile-header">
                        <img
                            src={
                                profile.avatarImgURL ||
                                "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                            }
                            alt={profile.username}
                            className="profile-avatar"
                        />
                        <h2 className="profile-username">{profile.username}</h2>
                        <p className="profile-email">{profile.email}</p>
                    </div>

                    <div className="profile-info">
                        <p className="description">
                            {profile.description || "No bio yet."}
                        </p>
                        <p>
                            <strong>Location:</strong>{" "}
                            {profile.location || "Not specified."}
                        </p>
                        <p>
                            <strong>Phone:</strong>{" "}
                            {profile.tel || "Not provided."}
                        </p>
                    </div>

                    <div className="profile-stats">
                        <div className="workout-box">
                            <h3>{profile.workouts?.length}</h3>
                            <p>
                                {profile.workouts?.length > 1
                                    ? "Workouts"
                                    : "Workout"}
                            </p>
                        </div>
                    </div>

                    <div className="profile-actions">
                        <button
                            onClick={editProfileClickHandler}
                            className="edit-button"
                        >
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
