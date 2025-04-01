import "./ProfileEdit.css";

import React, { useContext, useEffect, useState } from "react";

import userService from "../../services/userService.js";

import { ErrorContext } from "../../contexts/ErrorContext.jsx";

export default function ProfileEdit({ onClose, onSave, setProfile }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [tel, setTel] = useState("");
    const [avatarImgURL, setAvatarImgURL] = useState("");
    const [errors, setErrors] = useState({});
    const { showError } = useContext(ErrorContext);

    useEffect(() => {
        userService
            .getProfile()
            .then((profileData) => {
                setUsername(profileData.username);
                setEmail(profileData.email);
                setDescription(profileData.description || "");
                setLocation(profileData.location || "");
                setTel(profileData.tel || "");
                setAvatarImgURL(profileData.avatarImgURL || "");
            })
            .catch((error) => showError(error.message));
    }, [showError]);

    const usernameChangeHandler = (e) => {
        const username_val = e.target.value;

        setUsername(username_val);

        if (!username_val.trim()) {
            setErrors((prev) => ({
                ...prev,
                username: "Username is required!",
            }));
        } else if (username_val.trim().length < 5) {
            setErrors((prev) => ({
                ...prev,
                username: "Username must be at least 5 characters long!",
            }));
        } else if (username_val.trim().length > 20) {
            setErrors((prev) => ({
                ...prev,
                username: "Username must not exceed 20 characters!",
            }));
        } else {
            setErrors((prev) => ({ ...prev, username: null }));
        }
    };

    const emailChangeHandler = (e) => {
        const email_val = e.target.value;

        setEmail(email_val);

        if (!email_val.trim()) {
            setErrors((prev) => ({
                ...prev,
                email: "Email is required!",
            }));
        } else if (!/^\S+@\S+\.\S+$/.test(email_val.trim())) {
            setErrors((prev) => ({
                ...prev,
                email: "Please enter a valid email!",
            }));
        } else {
            setErrors((prev) => ({ ...prev, email: null }));
        }
    };

    const descriptionChangeHandler = (e) => {
        const description_val = e.target.value;

        setDescription(description_val);

        if (description_val.length > 0 && description_val.trim().length < 3) {
            setErrors((prev) => ({
                ...prev,
                description: "Description must be at least 3 characters long!",
            }));
        } else if (description_val.trim().length > 200) {
            setErrors((prev) => ({
                ...prev,
                description: "Description must not exceed 200 characters!",
            }));
        } else {
            setErrors((prev) => ({ ...prev, description: null }));
        }
    };

    const locationChangeHandler = (e) => {
        const location_val = e.target.value;

        setLocation(location_val);

        if (location_val.length > 0 && location_val.trim().length < 5) {
            setErrors((prev) => ({
                ...prev,
                location: "Location must be at least 5 characters long!",
            }));
        } else if (location_val.trim().length > 50) {
            setErrors((prev) => ({
                ...prev,
                location: "Location must not exceed 100 characters!",
            }));
        } else {
            setErrors((prev) => ({ ...prev, location: null }));
        }
    };

    const telChangeHandler = (e) => {
        const tel_val = e.target.value;

        setTel(tel_val);

        if (tel_val && !/^\+?\d{7,15}$/.test(tel_val)) {
            setErrors((prev) => ({
                ...prev,
                tel: "Please enter a valid phone number!",
            }));
        } else {
            setErrors((prev) => ({ ...prev, tel: "" }));
        }
    };

    const avatarImgURLChangeHandler = (e) => {
        const avatarImgURL_val = e.target.value;

        setAvatarImgURL(avatarImgURL_val);

        if (
            avatarImgURL_val &&
            !/^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/i.test(avatarImgURL_val)
        ) {
            setErrors((prev) => ({
                ...prev,
                avatarImgURL: "Please enter a valid image link!",
            }));
        } else {
            setErrors((prev) => ({ ...prev, avatarImgURL: "" }));
        }
    };

    const validateForm = () => {
        let newErrors = {};

        if (!username.trim()) {
            newErrors.username = "Username is required!";
        } else if (username.trim().length < 5) {
            newErrors.username = "Username must be at least 5 characters long!";
        } else if (username.trim().length > 20) {
            newErrors.username = "Username must not exceed 20 characters!";
        }

        if (!email.trim()) {
            newErrors.email = "Email is required!";
        } else if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
            newErrors.email = "Please enter a valid email!";
        }

        if (description.length > 0 && description.trim().length < 3) {
            newErrors.description =
                "Description must be at least 3 characters long!";
        } else if (description.trim().length > 200) {
            newErrors.description =
                "Description must not exceed 200 characters!";
        }

        if (location.length > 0 && location.trim().length < 3) {
            newErrors.location = "Location must be at least 3 characters long!";
        } else if (location.trim().length > 50) {
            newErrors.location = "Location must not exceed 50 characters!";
        }

        if (tel && !/^\+?\d{7,15}$/.test(tel)) {
            newErrors.tel = "Please enter a valid phone number!";
        }

        if (
            avatarImgURL &&
            !/^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/i.test(avatarImgURL)
        ) {
            newErrors.avatarImgURL = "Please enter a valid image link!";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const profileData = {
            ...Object.fromEntries(formData),
        };

        if (!validateForm()) {
            return;
        }

        try {
            const editedProfile = await userService.editProfile({
                ...profileData,
            });

            setProfile(editedProfile);
            showError("");
            onSave();
        } catch (error) {
            showError(error.message);
            onClose();
        }
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
                                {errors.username && (
                                    <p className="error">{errors.username}</p>
                                )}
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
                                {errors.email && (
                                    <p className="error">{errors.email}</p>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">
                                    Bio (optional)
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={description}
                                    onChange={descriptionChangeHandler}
                                />
                                {errors.description && (
                                    <p className="error">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="location">
                                    Location (optional)
                                </label>
                                <input
                                    id="location"
                                    name="location"
                                    type="text"
                                    value={location}
                                    onChange={locationChangeHandler}
                                />
                                {errors.location && (
                                    <p className="error">{errors.location}</p>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="tel">
                                    Telephone Number (optional)
                                </label>
                                <input
                                    id="tel"
                                    name="tel"
                                    type="tel"
                                    value={tel}
                                    onChange={telChangeHandler}
                                />
                                {errors.tel && (
                                    <p className="error">{errors.tel}</p>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="avatarImgURL">
                                    Profile Picture (optional)
                                </label>
                                <input
                                    id="avatarImgURL"
                                    name="avatarImgURL"
                                    type="url"
                                    value={avatarImgURL}
                                    onChange={avatarImgURLChangeHandler}
                                />
                                {errors.avatarImgURL && (
                                    <p className="error">
                                        {errors.avatarImgURL}
                                    </p>
                                )}
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
