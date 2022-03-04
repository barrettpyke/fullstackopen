/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('hello fullstack');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  res.json(calculateBmi(height, weight));
});

app.post('/exercises', (req, res) => {
  const exercisesArr = req.body.daily_exercises;
  const target = req.body.target;
  try {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  res.json(exerciseCalculator(exercisesArr, target));
  } catch (error) {
    res.json(error);
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});