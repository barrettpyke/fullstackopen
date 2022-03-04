/* interface BmiValues {
  height: number;
  weight: number;
} */

//only needed for command line
/* const parseArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers.')
  }
} */ 

export const calculateBmi = (height: number, weight: number) => {
  const calcHeight = height/100;
  const bmi =  weight / (calcHeight * calcHeight);

    if (bmi < 18.5) {
      console.log('underweight');
      return {
        height: height,
        weight: weight,
        bmi: 'underweight'
      };
    } else if (bmi > 18.5 && bmi < 25.0) {
      console.log('normal weight');
      return {
        height: height,
        weight: weight,
        bmi: 'normal weight'
      };
    } else if (bmi > 25.0 && bmi < 30.0) {
      console.log('overweight');
      return {
        height: height,
        weight: weight,
        bmi: 'overweight'
      };
    } else {
      console.log('obese');
      return {
        height: height,
        weight: weight,
        bmi: 'underweight'
      };
    }
};

//only needed for command line 
/* const bmiCalculator = () => {
  try {
    const { height, weight } = parseArguments(process.argv);
    calculateBmi(height, weight)
  } catch (error: unknown) {
    let errorMessage = 'Error!'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message
    }
    console.log(errorMessage)
  }
} */
