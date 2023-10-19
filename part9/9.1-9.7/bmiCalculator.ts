// TODO: the type of returned value of parseArgument function
interface bmiValues {
  height: number;
  weight: number;
}

// TODO: Ensures that the parameters given to calculateBmi are of right type
const parseArgumentsBmi = (args: string[]): bmiValues => {
  if (args.length === 2)
    throw new Error(
      "Please provide the height and weight need to be calculated accordingly in number type"
    );
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("One of or both provided values were not numbers");
  }
};

// TODO: bmi Calculator
const calculateBmi = (height: number, weight: number): string => {
  let heightInMeters = height / 100;
  let bmi = weight / (heightInMeters * heightInMeters);
  if (bmi < 16.0) {
    return "Underweight - Severe thinness";
  } else if (bmi >= 16.0 && bmi <= 16.9) {
    return "Underweight - Moderate thinness";
  } else if (bmi >= 17.0 && bmi <= 18.4) {
    return "Underweight - Mild thinness";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return "Normal (healthy weight)";
  } else if (bmi >= 25.0 && bmi <= 29.9) {
    return "Overweight - Pre-obese";
  } else if (bmi >= 30.0 && bmi <= 34.9) {
    return "Obese - Class I";
  } else if (bmi >= 35.0 && bmi <= 39.9) {
    return "Obese - Class II";
  } else if (bmi >= 40.0) {
    return "Obese - Class III";
  }
};

// TODO: Print result, otherwise print errors
try {
  const { height, weight } = parseArgumentsBmi(process.argv);
  const result = calculateBmi(height, weight);
  console.log(result);
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
