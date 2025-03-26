import "./WorkoutDetails.css";

import { Avatar, List, Space, Input, Empty, Typography } from "antd";
import { LikeFilled, LikeOutlined } from "@ant-design/icons";

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Helmet } from "react-helmet-async";

import workoutService from "../../services/workoutService.js";
import { UserContext } from "../../contexts/UserContext.jsx";
import commentService from "../../services/commentService.js";

import SubscribeStar from "../workout-catalog-subscribe-star/SubscribeStar.jsx";
import EditWorkout from "../workout-catalog-edit/WorkoutEdit.jsx";
import { ErrorContext } from "../../contexts/ErrorContext.jsx";

export default function WorkoutDetails() {
    const { workoutId } = useParams();
    const [workout, setWorkout] = useState({});
    const [comment, setComment] = useState([]);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [showEditWorkout, setShowEditWorkout] = useState(false);
    const [likeAction, setLikeAction] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [errors, setErrors] = useState({});
    const { showError } = useContext(ErrorContext);

    const { isLoggedIn, _id: userId } = useContext(UserContext);
    const isOwner = userId === workout.userId;

    const navigate = useNavigate();

    const IconText = ({ icon, text }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );

    const { TextArea } = Input;

    const editWorkoutClickHandler = () => {
        setShowEditWorkout(true);
    };

    const closeEditWorkoutClickHandler = () => {
        setShowEditWorkout(false);
    };

    const saveEditWorkoutClickHandler = async () => {
        setShowEditWorkout(false);
    };

    const commentChangeHandler = (e) => {
        setComment(e.target.value);

        if (e.target.value.length > 0 && e.target.value.trim().length < 1) {
            setErrors((prev) => ({
                ...prev,
                comment: "Comment must be at least 1 character long!",
            }));
        } else if (e.target.value.trim().length > 200) {
            setErrors((prev) => ({
                ...prev,
                comment: "Comment must not exceed 200 characters!",
            }));
        } else {
            setErrors((prev) => ({ ...prev, comment: null }));
        }
    };

    const likeCommentClickHandler = (commentId) => {
        setIsPending(true);

        commentService
            .likeComment(commentId)
            .then((data) => {
                console.log(data);
                setLikeAction((prev) => !prev);
            })
            .catch((err) => {
                showError(err.message);
                setIsPending(false);
            });
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const commentText = formData.get("comment");

        console.log(commentText);

        let newErrors = {};

        if (comment.length > 0 && comment.trim().length < 1) {
            newErrors.comment = "Comment must be at least 1 character long!";
        }

        if (comment.trim().length > 200) {
            newErrors.comment = "Comment must not exceed 200 characters!";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsPending(true);

        //implement POST
        try {
            const updatedWorkout = await commentService.createComment(
                commentText,
                workoutId
            );

            console.log(updatedWorkout);
            //update comment state
            setWorkout(updatedWorkout);
            //clear formData
            setComment("");
        } catch (error) {
            showError(error.message);
        } finally {
            setIsPending(false);
        }
    };

    const deleteWorkoutClickHandler = async () => {
        const hasConfirm = confirm(
            `Are you sure you want to delete ${workout.workoutName}?`
        );

        if (!hasConfirm) {
            return;
        }

        try {
            await workoutService.delete(workoutId);
            navigate("/workouts");
        } catch (error) {
            showError(error.message);
        }
    };

    useEffect(() => {
        const abortController = new AbortController();

        workoutService
            .getOne(workoutId, abortController)
            .then((data) => {
                console.log(data);
                setWorkout(data);
            })
            .catch(() => {
                navigate("/404");
            })
            .finally(() => {
                setIsPending(false);
            });

        return () => {
            abortController.abort();
        };
    }, [workoutId, likeAction, navigate]);

    useEffect(() => {
        setIsSubscribed(workout.subscribers?.includes(userId));
    }, [workout, userId]);

    return (
        <>
            {showEditWorkout && (
                <EditWorkout
                    workoutId={workoutId}
                    onClose={closeEditWorkoutClickHandler}
                    onSave={saveEditWorkoutClickHandler}
                    setWorkout={setWorkout}
                />
            )}

            <Helmet>
                <title>
                    {workout
                        ? `${workout.workoutName} - Machina`
                        : "Details - Machina"}
                </title>
            </Helmet>

            <div className="workout-details">
                <SubscribeStar
                    alreadySubscribed={isSubscribed}
                    workoutId={workoutId}
                />
                <h1 className="workout-title">{workout.workoutName}</h1>{" "}
                <p className="workout-meta">
                    <strong>Difficulty:</strong> {workout.difficulty} |{" "}
                    <strong>Length:</strong> {workout.length} min
                </p>
                <img
                    src={
                        workout.imgURL ||
                        "https://cdn.vectorstock.com/i/2000v/02/13/dumbbell-icon-in-flat-style-workout-gym-tool-vector-54560213.avif"
                    }
                    alt={workout.workoutName}
                    className="workout-image"
                />
                <p className="workout-description">{workout.description}</p>
                {isOwner && (
                    <div className="workout-actions">
                        <button
                            onClick={editWorkoutClickHandler}
                            className="edit-button"
                        >
                            Edit
                        </button>
                        <button
                            onClick={deleteWorkoutClickHandler}
                            className="delete-button"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
            <h2>Exercises</h2>
            <div className="exercises-details">
                <div className="exercise-container">
                    {workout.exercises?.length > 0 ? (
                        workout.exercises.map((exercise, index) => (
                            <div key={index} className={`exercise-card `}>
                                <span
                                    className={`badge ${exercise.difficulty.toLowerCase()}`}
                                >
                                    {exercise.difficulty}
                                </span>
                                <h3 className="exercise-name">
                                    {exercise.name}
                                </h3>
                                <p>
                                    <strong>Muscle Group:</strong>{" "}
                                    {exercise.muscle}
                                </p>
                                <p>
                                    <strong>Type:</strong> {exercise.type}
                                </p>
                                <p>
                                    <strong>Equipment:</strong>{" "}
                                    {exercise.equipment}
                                </p>
                                <details className="exercise-details">
                                    <summary>Instructions</summary>
                                    <p className="exercise-instructions">
                                        {exercise.instructions}
                                    </p>
                                </details>
                            </div>
                        ))
                    ) : (
                        <p className="no-exercises">
                            No exercises found for this workout.
                        </p>
                    )}
                </div>
            </div>
            <h2>Comments</h2>
            <div className="workout-details comment-list">
                {workout.comments?.length > 0 ? (
                    <List
                        itemLayout="horizontal"
                        dataSource={workout.comments}
                        renderItem={(item) => (
                            <List.Item
                                actions={[
                                    <a
                                        onClick={() => {
                                            if (
                                                isPending ||
                                                !isLoggedIn() ||
                                                item.likes.includes(userId)
                                            )
                                                return;
                                            likeCommentClickHandler(item._id);
                                        }}
                                        className={`like-button ${
                                            !isLoggedIn() ||
                                            item.likes.includes(userId)
                                                ? "disabled"
                                                : ""
                                        } ${
                                            item.likes.includes(userId)
                                                ? "liked"
                                                : ""
                                        }`}
                                    >
                                        <IconText
                                            icon={
                                                item.likes.includes(userId)
                                                    ? LikeFilled
                                                    : LikeOutlined
                                            }
                                            text={item.likes?.length}
                                            key="list-vertical-like-o"
                                        />
                                    </a>,
                                ]}
                            >
                                <List.Item.Meta
                                    avatar={
                                        <Avatar
                                            src={
                                                item.userId.avatarImgURL ||
                                                "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                                            }
                                        />
                                    }
                                    title={item.userId.username}
                                    description={item.text}
                                />
                            </List.Item>
                        )}
                    />
                ) : (
                    <>
                        <Empty
                            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                            styles={{ image: { height: 60 } }}
                            description={
                                <Typography.Text>
                                    No Comments Yet!
                                </Typography.Text>
                            }
                        ></Empty>
                    </>
                )}

                {isLoggedIn() && (
                    <>
                        <h3>Leave a Comment Here:</h3>
                        <form
                            className="submit-comment-form"
                            onSubmit={onSubmitHandler}
                        >
                            <TextArea
                                id="comment"
                                name="comment"
                                rows={3}
                                value={comment}
                                onChange={commentChangeHandler}
                                required
                            />
                            {errors.comment && (
                                <p className="error">{errors.comment}</p>
                            )}
                            <button
                                type="submit"
                                className="btn"
                                disabled={isPending}
                            >
                                Comment
                            </button>
                        </form>
                    </>
                )}
            </div>
        </>
    );
}
