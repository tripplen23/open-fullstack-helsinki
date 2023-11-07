import { CoursePart } from "../types";
import Part from "./Part";

const margin = { marginTop: 10 };

const Content = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <div>
      {parts.map((part, index) => (
        <div key={index} style={margin}>
          <div>
            <b>
              {" "}
              {part.name} {part.exerciseCount}{" "}
            </b>
          </div>

          <Part part={part} />
        </div>
      ))}
    </div>
  );
};

export default Content;
