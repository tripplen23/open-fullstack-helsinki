import React from "react";
import ReactDOM from "react-dom";

const Header = ({ courseName }) => <h1>{courseName}</h1>;

const Part = ({ partName, exercises }) => (
  <p>
    {partName} {exercises}
  </p>
);

const Content = ({ courseParts }) => (
  <>
    {courseParts.map(({ name, exercises }, i) => (
      <Part key={i} partName={name} exercises={exercises} />
    ))}
  </>
);

const Total = ({ totalExercises }) => (
  <p>Number of exercises {totalExercises}</p>
);

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10
      },
      {
        name: "Using props to pass data",
        exercises: 7
      },
      {
        name: "State of a component",
        exercises: 14
      }
    ]
  };

  const totalExercises = course.parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises,
    0
  );

  return (
    <div>
      <Header courseName={course.name} />
      <Content courseParts={course.parts} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;
