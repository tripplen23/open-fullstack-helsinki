import express from "express";
import { calculateBmi2 } from "./bmiCalculator2";
const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
