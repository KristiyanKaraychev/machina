import "./WorkoutDetails.css";

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { Avatar, List, Space, Input, Empty, Typography } from "antd";
import { LikeFilled, LikeOutlined } from "@ant-design/icons";

import workoutService from "../../services/workoutService.js";
import { UserContext } from "../../contexts/UserContext.js";

import SubscribeStar from "../workout-catalog-subscribe-star/SubscribeStar.jsx";
import commentService from "../../services/commentService.js";
import EditWorkout from "../workout-catalog-edit/WorkoutEdit.jsx";

export default function WorkoutDetails() {
    const { workoutId } = useParams();
    const [workout, setWorkout] = useState({});
    const [comment, setComment] = useState([]);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [showEditWorkout, setShowEditWorkout] = useState(false);
    const [likeAction, setLikeAction] = useState(false);

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
    };

    const likeCommentClickHandler = (commentId) => {
        commentService
            .likeComment(commentId)
            .then((data) => {
                console.log(data);
                setLikeAction((prev) => !prev);
            })
            .catch((err) => console.log(err));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const commentText = formData.get("comment");

        console.log(commentText);

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
            console.log(error);
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
            console.log(error.message);
        }
    };

    useEffect(() => {
        const abortController = new AbortController();

        workoutService.getOne(workoutId, abortController).then((data) => {
            console.log(data);
            setWorkout(data);
        });

        return () => {
            abortController.abort();
        };
    }, [workoutId, likeAction]);

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

            {isOwner && (
                <div>
                    <button onClick={editWorkoutClickHandler}>Edit</button>
                    <button onClick={deleteWorkoutClickHandler}>Delete</button>
                </div>
            )}

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
                    src={workout.imgURL}
                    alt={workout.workoutName}
                    className="workout-image"
                />
                <p className="workout-description">{workout.description}</p>
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
                                        onClick={
                                            isLoggedIn() &&
                                            !item.likes.includes(userId)
                                                ? () =>
                                                      likeCommentClickHandler(
                                                          item._id
                                                      )
                                                : undefined
                                        }
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
                                    // <a key="list-loadmore-delete">delete</a>,
                                ]}
                            >
                                <List.Item.Meta
                                    avatar={
                                        <Avatar
                                            src={
                                                item.userId.avatarImgURL ||
                                                "default"
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
                            <button type="submit" className="btn ">
                                Comment
                            </button>
                        </form>
                    </>
                )}
            </div>
        </>
    );
}
