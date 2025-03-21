import "./ProfileEdit.css";

import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router";
import userService from "../../services/userService.js";

export default function ProfileEdit({ onClose, onSave, setProfile }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [tel, setTel] = useState("");
    const [avatarImgURL, setAvatarImgURL] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        userService
            .getProfile()
            .then((profileData) => {
                console.log(profileData);

                setUsername(profileData.username);
                setEmail(profileData.email);
                setDescription(profileData.description || "");
                setLocation(profileData.location || "");
                setTel(profileData.tel || "");
                setAvatarImgURL(profileData.avatarImgURL || "");
            })
            .catch((err) => console.log(err.message));
    }, []);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const profileData = {
            ...Object.fromEntries(formData),
        };

        try {
            const editedProfile = await userService.editProfile({
                ...profileData,
            });

            console.log(editedProfile);

            setProfile(editedProfile);
            navigate(`/profile`);
            onSave();
        } catch (error) {
            console.log(error.message);
        }
    };

    const usernameChangeHandler = (e) => {
        setUsername(e.target.value);
    };

    const emailChangeHandler = (e) => {
        setEmail(e.target.value);
    };

    const descriptionChangeHandler = (e) => {
        setDescription(e.target.value);
    };

    const locationChangeHandler = (e) => {
        setLocation(e.target.value);
    };

    const telChangeHandler = (e) => {
        setTel(e.target.value);
    };

    const avatarImgURLChangeHandler = (e) => {
        setAvatarImgURL(e.target.value);
    };

    return (
        <>
            <div className="overlay">
                <div className="backdrop" onClick={onClose}></div>
                <div className="modal">
                    <div className="form-wrapper">
                        <button className="close-btn" onClick={onClose}>
                            &times;
                        </button>
                        <h2>Edit Profile</h2>
                        <form onSubmit={onSubmitHandler}>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    value={username}
                                    onChange={usernameChangeHandler}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={emailChangeHandler}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Bio</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={description}
                                    onChange={descriptionChangeHandler}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="location">Location</label>
                                <input
                                    id="location"
                                    name="location"
                                    type="text"
                                    value={location}
                                    onChange={locationChangeHandler}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="tel">Telephone Number</label>
                                <input
                                    id="tel"
                                    name="tel"
                                    type="tel"
                                    value={tel}
                                    onChange={telChangeHandler}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="avatarImgURL">
                                    Profile Picture
                                </label>
                                <input
                                    id="avatarImgURL"
                                    name="avatarImgURL"
                                    type="url"
                                    value={avatarImgURL}
                                    onChange={avatarImgURLChangeHandler}
                                />
                            </div>

                            <button type="submit" className="btn">
                                Edit Profile
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
