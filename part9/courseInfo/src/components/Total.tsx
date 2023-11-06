import React from "react";

interface Part {
  name: string;
  exerciseCount: number;
}

interface TotalProps {
  parts: Part[];
}

const Total: React.FC<TotalProps> = ({ parts }) => {
  const totalExercise = parts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return <p>Number of exercises {totalExercise}</p>;
};

export default Total;
