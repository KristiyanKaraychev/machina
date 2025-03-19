import { createContext, useContext, useState } from "react";

const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
    const [subscriptions, setSubscriptions] = useState([]);

    const subscribe = (workoutId) => {
        setSubscriptions([...subscriptions, workoutId]);
    };

    const isSubscribed = (workoutId) => subscriptions.includes(workoutId);

    return (
        <SubscriptionContext.Provider value={{ isSubscribed, subscribe }}>
            {children}
        </SubscriptionContext.Provider>
    );
};

export const useSubscription = () => useContext(SubscriptionContext);
