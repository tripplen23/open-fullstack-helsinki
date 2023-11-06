// TODO: Renders all attributes of each type of course part

import { CoursePart } from "../types";

// TODO: Helper function for exhaustive type checking
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <i>{part.description}</i>
        </div>
      );
      break;
    case "group":
      return <div>Project exercises: {part.groupProjectCount}</div>;
      break;
    case "background":
      return (
        <div>
          <i>{part.description}</i>
          <br />
          <div>Background material: {part.backgroundMaterial}</div>
        </div>
      );
      break;
    case "special":
      return (
        <div>
          <i>Description: {part.description}</i>
          <br />
          <i>
            required skills:{" "}
            {part.requirements.map((skill) => skill).join(", ")}
          </i>
        </div>
      );
    default:
      return assertNever(part);
      break;
  }
};

export default Part;
