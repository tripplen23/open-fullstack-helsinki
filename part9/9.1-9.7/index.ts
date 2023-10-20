import express from "express";
import { calculateBmi2 } from "./bmiCalculator2";
import { exerciseCalculator } from "./exerciseCalculator";
const app = express();
app.use(express.json());

// TODO: /hello endpoint
app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

// TODO: /bmi endpoint
app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  const validParameters: boolean =
    !isNaN(Number(height)) && !isNaN(Number(weight));

  const bmi = calculateBmi2(Number(height), Number(weight));

  if (!validParameters || !weight || !height) {
    res.status(400).send({ error: "malformed parameters" });
  }

  res.send({ height, weight, bmi });
});

// TODO: /exercises endpoint
app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  // Validate parameters
  if (!daily_exercises || !target) {
    return res.status(400).json({ error: "parameters missing" });
  }

  // Validate input data type
  if (
    !Array.isArray(daily_exercises) ||
    !daily_exercises.every((hour) => !isNaN(Number(hour))) ||
    isNaN(Number(target))
  ) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = exerciseCalculator(daily_exercises, Number(target));
  console.log(result);
  return res.json({ result });
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
