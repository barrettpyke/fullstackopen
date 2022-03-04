interface Results {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const ratingCalc = (average: number, target: number): number => {
  if (average < target) {
    return 1;
  } else if (target === average) {
    return 2;
  } 
  return 3;
};

const ratingDescriptionSwitch = (rating: number): string => {
  switch(rating) {
    case 1:
      return 'Pick it up next week!'; 
    case 2:
      return 'Not too bad!';
    case 3:
      return 'You\'re amazing!';
  }
  return "Error";
};

const successSwitch = (rating: number): boolean => {
  switch(rating) {
    case 1:
      return false;
    case 2:
      return true;
    case 3:
      return true;
  }
  return false;
};

/* const parseArgs = (args: Array<string>) => {
  if (args.length < 3) throw new Error('Not enough arguments');

  if (!isNaN(Number(args[2]))) {
    const hoursArr = args.slice(3);
    const hoursNumArr = hoursArr.map(Number);
    return {
      target: Number(args[2]),
      hours: hoursNumArr
    };
  } else {
    throw new Error('Provided values were not numbers.');
  }
}; */

export const exerciseCalculator = (hours: Array<number>, target: number) : Results => {
  const average = hours.reduce((curr, a) => curr + a, 0) / hours.length;
  const rating = ratingCalc(average, target);
  const Results = {
    periodLength: hours.length,
    trainingDays: hours.filter((el) => el > 0).length,
    success: successSwitch(rating),
    rating: rating,
    ratingDescription: ratingDescriptionSwitch(rating),
    target: target,
    average: average
  };
  return Results;
};

// try {
//   const { target, hours } = parseArgs(process.argv);
//   exerciseCalculator(hours, target);
// } catch (error: unknown) {
//   let errorMessage = 'Error!';
//   if (error instanceof Error) {
//     errorMessage += ' Error: ' + error.message;
//   }
//   console.log(errorMessage);
// }