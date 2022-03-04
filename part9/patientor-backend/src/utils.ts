import { NewPatient, Gender } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name.');
  }
  return name;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing SSN.');
  }
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing Occupation.');
  }
  return occupation;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if(!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

type Fields = { name: unknown, dateOfBirth: unknown, occupation: unknown, gender: unknown, ssn: unknown };


const toNewPatient = ({ name, dateOfBirth, occupation, gender, ssn } : Fields): NewPatient => {
  const newEntry: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    occupation: parseOccupation(occupation),
    gender: parseGender(gender),
    ssn: parseSsn(ssn)
  };
  return newEntry;
};

export default toNewPatient;