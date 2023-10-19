// TODO: the type of returned value of parseArgument function
interface exerciseValues {
  dailyExerciseHours: number[];
  target: number;
}

// TODO: Ensures that the parameters given to exerciseCalculator are of right type
const parseArgumentsExercise = (args: Array<string>): exerciseValues => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const exerciseValues = args.slice(2);

  const notValid = exerciseValues.some((arg) => isNaN(Number(arg)));

  const validArgs = exerciseValues.map((arg) =>
    !isNaN(Number(arg)) ? Number(arg) : null
  );

  // remove the position of the target argument and return it
  const target = validArgs.shift();

  const dailyExerciseHours = validArgs;

  if (!notValid) {
    return {
      dailyExerciseHours,
      target,
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const exerciseCalculator = (
  dailyExerciseHours: number[],
  target: number
): Result => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((hour) => hour > 0).length;
  const average = dailyExerciseHours.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;

  const getRating = (average: number, target: number): number => {
    if (average < target * 0.9) {
      return 1;
    } else if (average < target) {
      return 2;
    } else if (average > target) {
      return 3;
    }
  };

  const rating = getRating(average, target);

  const getRatingDescription = (rating: number): string => {
    if (rating === 1) {
      return "Did not meet the target, keep doing better.";
    } else if (rating === 2) {
      return "Not too bad but could be better.";
    } else if (rating === 3) {
      return "Good work. Keep it up!";
    }
  };

  const ratingDescription = getRatingDescription(rating);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

// TODO: Print result, otherwise print errors
try {
  const { dailyExerciseHours, target } = parseArgumentsExercise(process.argv);
  console.log(exerciseCalculator(dailyExerciseHours, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
