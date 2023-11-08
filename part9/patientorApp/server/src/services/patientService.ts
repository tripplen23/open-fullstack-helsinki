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

  if (patient) {
    // TODO: Modify the patient data to include the "entries" field
    const patientWithEntries: Patient = {
      ...patient,
      entries: patient.entries || [], // Initialize entries as an empty array if it's missing
    };
    return patientWithEntries;
  }

  return undefined;
};

const addPatient = (patient: NewPatient): Patient => {
  // Create a new patient with an empty entries array
  const newPatient: Patient = {
    id: uuid(),
    ...patient,
    entries: [],
  };

  patientsData.push(newPatient);
  return newPatient;
};

export default {
  getPatientsData,
  getNonSensitivePatientData,
  findPatientById,
  addPatient,
};
