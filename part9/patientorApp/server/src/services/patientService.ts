import patientsData from "../../data/patients";
import { Patient, NonSensitivePatient, NewPatient } from "../types";
import { v1 as uuid } from "uuid";

const getPatientsData = (): Array<Patient> => {
  return patientsData;
};

const getNonSensitivePatientData = (): Array<NonSensitivePatient> => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findPatientById = (id: string): Patient | undefined => {
  const patient = patientsData.find((p) => p.id === id);
  return patient;
};

const addPatient = (patient: NewPatient): Patient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const newPatient = { id: uuid(), ...patient };
  patientsData.push(newPatient);
  return newPatient;
};

export default {
  getPatientsData,
  getNonSensitivePatientData,
  findPatientById,
  addPatient,
};
