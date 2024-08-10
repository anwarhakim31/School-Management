import React, { useState, useEffect } from "react";

const AnimasiCounter = ({ targetNumber }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = Math.ceil(targetNumber / (duration / 16.7));

    const animate = (timestamp) => {
      start += increment;
      if (start >= targetNumber) {
        setCount(targetNumber);
      } else {
        setCount(start);
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animate);
  }, [targetNumber]);

  return <div>{count}</div>;
};

export default AnimasiCounter;
