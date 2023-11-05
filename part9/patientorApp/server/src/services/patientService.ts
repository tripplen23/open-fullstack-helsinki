import patientData from "../../data/patients";
import { Patient, NonSensitivePatient } from "../types";

const getPatientData = (): Array<Patient> => {
  return patientData;
};

const getNonSensitivePatientData = (): Array<NonSensitivePatient> => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getPatientData,
  getNonSensitivePatientData,
};
