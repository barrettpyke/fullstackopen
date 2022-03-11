import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { PublicPatient, NewPatient, Patient } from '../types';

const getPatients = () : Array<PublicPatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatient = (id: string) : unknown => {
  return patients.find(patient => patient.id === id);
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

export default { getPatients, addPatient, getPatient };