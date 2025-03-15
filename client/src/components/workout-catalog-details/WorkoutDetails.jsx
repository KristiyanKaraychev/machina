import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import { Avatar, List, Space, Input } from "antd";
import { LikeOutlined } from "@ant-design/icons";

import workoutService from "../../services/workoutService.js";

export default function WorkoutDetails() {
    const { workoutId } = useParams();
    const [workout, setWorkout] = useState({});

    const commentData = [
        {
            title: "Ant Design Title 1",
        },
        {
            title: "Ant Design Title 2",
        },
        {
            title: "Ant Design Title 3",
        },
        {
            title: "Ant Design Title 4",
        },
    ];

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
        });

        return () => {
            abortController.abort();
        };
    }, [workoutId]);

    return (
        <>
            <div className="workout-details">
                <img
                    src={workout.imgURL}
                    alt={workout.workoutName}
                    className="workout-image"
                />
                <h1 className="workout-title">{workout.workoutName}</h1>
                <p className="workout-description">{workout.description}</p>
                <p className="workout-meta">
                    <strong>Difficulty:</strong> {workout.difficulty} |{" "}
                    <strong>Length:</strong> {workout.length} min
                </p>

                <h2>Exercises</h2>
                {/* <ul className="exercise-list">
                    {workout.exercises.length > 0 ? (
                        workout.exercises.map((exercise, index) => (
                            <li key={index} className="exercise-item">
                                {exercise.name}
                            </li>
                        ))
                    ) : (
                        <p>No exercises found for this workout.</p>
                    )}
                </ul> */}
            </div>
            <h2>Comments</h2>
            <div className="workout-details comment-list">
                <List
                    itemLayout="horizontal"
                    dataSource={commentData}
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
                                title={item.title}
                                description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab, expedita?"
                            />
                        </List.Item>
                    )}
                />
                <h3>Leave a Comment Here:</h3>
                <TextArea rows={3} />
                <div className="submit-btn">
                    <a key="submit-comments" className="btn">
                        Comment
                    </a>
                </div>
            </div>
        </>
    );
}
