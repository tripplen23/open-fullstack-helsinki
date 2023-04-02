import React from 'react';

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Course = ({ course }) => {
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      <Header course={course} />
      {course.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <p>Total of {total} exercises</p>
    </div>
  );
};

export default Course;
