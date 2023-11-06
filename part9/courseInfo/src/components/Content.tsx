import React from "react";

interface Part {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  parts: Part[];
}

const Content: React.FC<ContentProps> = ({ parts }) => {
  return (
    <div>
      {parts.map((part, index) => (
        <p key={index}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
