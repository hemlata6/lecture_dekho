import React, { useEffect, useState } from "react";

const CounterUp = ({ target, duration }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = parseInt(target, 10); // Ensure the target is a number
        if (start === end) return;

        const incrementTime = (duration / end) * 1000; // Time per increment in milliseconds
        const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === end) clearInterval(timer);
        }, incrementTime);

        return () => clearInterval(timer); // Cleanup on component unmount
    }, [target, duration]);

    return (
        <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#1356C5" }}>
            {count}+
        </div>
    );
};

export default CounterUp;
