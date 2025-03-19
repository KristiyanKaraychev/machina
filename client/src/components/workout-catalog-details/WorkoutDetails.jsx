import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";

import { Avatar, List, Space, Input, Empty, Typography } from "antd";
import { LikeOutlined } from "@ant-design/icons";

import workoutService from "../../services/workoutService.js";
import { UserContext } from "../../contexts/UserContext.js";

import SubscribeStar from "../workout-catalog-subscribe-star/SubscribeStar.jsx";
import commentService from "../../services/commentService.js";

export default function WorkoutDetails() {
    const { workoutId } = useParams();
    const [workout, setWorkout] = useState({});
    const [comment, setComment] = useState([]);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const { isLoggedIn, _id } = useContext(UserContext);
    const userId = _id;

    const IconText = ({ icon, text }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );

    const { TextArea } = Input;

    useEffect(() => {
        const abortController = new AbortController();

        workoutService.getOne(workoutId, abortController).then((data) => {
            console.log(data);
            setWorkout(data);
            // setComments(data.comments);
        });

        return () => {
            abortController.abort();
        };
    }, [workoutId]);

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

    useEffect(() => {
        setIsSubscribed(workout.subscribers?.includes(userId));
    }, [workout, userId]);

    return (
        <>
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
                        renderItem={(item, index) => (
                            <List.Item
                                actions={[
                                    <a>
                                        <IconText
                                            icon={LikeOutlined}
                                            text="99"
                                            key="list-vertical-like-o"
                                        />
                                    </a>,
                                    <a key="list-loadmore-delete">delete</a>,
                                ]}
                            >
                                <List.Item.Meta
                                    avatar={
                                        <Avatar
                                            src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
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
                                onChange={(e) => setComment(e.target.value)}
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
