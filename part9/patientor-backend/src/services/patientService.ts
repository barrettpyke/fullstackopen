import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { NonSensPatient, NewPatient, Patient } from '../types';

const getPatients = () : Array<NonSensPatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = ( entry: NewPatient): Patient => {
  const newPatient = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    id: String(uuid()),
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, addPatient };