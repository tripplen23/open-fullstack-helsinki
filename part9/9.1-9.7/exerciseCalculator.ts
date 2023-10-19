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
  dailyExerciseHour: number[],
  target: number
): Result => {
  const periodLength = dailyExerciseHour.length;
  const trainingDays = dailyExerciseHour.filter((hour) => hour > 0).length;
  const average = dailyExerciseHour.reduce((a, b) => a + b, 0) / periodLength;
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

  const getRatingDescription = (rating: number): string => {
    if (rating === 1) {
      return "Did not meet the target, keep doing better.";
    } else if (rating === 2) {
      return "Not too bad but could be better.";
    } else if (rating === 3) {
      return "Good work. Keep it up!";
    }
  };

  const rating = getRating(average, target);
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

console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2));
