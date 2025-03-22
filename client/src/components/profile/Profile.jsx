import { useEffect, useState } from "react";

import userService from "../../services/userService.js";

import ProfileEdit from "../profile-edit/ProfileEdit.jsx";

export default function Profile() {
    const [profile, setProfile] = useState({});
    const [showEditProfile, setShowEditProfile] = useState(false);

    useEffect(() => {
        userService
            .getProfile()
            .then((userData) => {
                console.log(userData);
                setProfile(userData);
            })
            .catch((err) => console.log(err.message));
    }, []);

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

            <div className="profile-wrapper">
                <h1>Your Profile</h1>
                <div className="profile-container">
                    <div className="profile-header">
                        <img
                            src={
                                profile.avatarImgURL ||
                                "https://i.imgur.com/CzXTtJV.jpg"
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

                    <div>
                        <button onClick={editProfileClickHandler}>Edit</button>
                    </div>
                </div>
            </div>
        </>
    );
}
