import { useEffect } from "react";

export default function Profile() {
    useEffect(() => {}, []);

    const user = {
        _id: "1",
        tel: "1231231231",
        workouts: [],
        comments: [],
        description:
            " Consequatur aliquid autem neConsequatur aliquid autem neConsequatur aliquid autem neConsequatur aliquid autem necessitatibus iusto? Culpa?",
        location: "Sofia, Bulgaria",
        avatarImgURL: "",
        email: "kk@abv.bg",
        username: "kk2",
        password: "aaa",
    };

    return (
        <>
            <div className="profile-wrapper">
                <h1>Your Profile</h1>
                <div className="profile-container">
                    <div className="profile-header">
                        <img
                            src={
                                user.avatarImgURL ||
                                "https://i.imgur.com/CzXTtJV.jpg"
                            }
                            alt={user.username}
                            className="profile-avatar"
                        />
                        <h2 className="profile-username">{user.username}</h2>
                        <p className="profile-email">{user.email}</p>
                    </div>

                    <div className="profile-info">
                        <p className="description">{user.description}</p>
                        <p>
                            <strong>Location:</strong>{" "}
                            {user.location || "Not specified"}
                        </p>
                        <p>
                            <strong>Phone:</strong> {user.tel || "Not provided"}
                        </p>
                    </div>

                    <div className="profile-stats">
                        <div className="workout-box">
                            <h3>{user.workouts.length}</h3>
                            <p>Workouts</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
