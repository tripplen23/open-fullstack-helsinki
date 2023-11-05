/*
export enum Gender {
  Male = "male",
  Female = "female",
  Others = "Others",
}
*/

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

// Exclude the ssn field
export type NonSensitivePatient = Omit<Patient, "ssn">;

// Omit id when implementing to add a new patient
export type NewPatient = Omit<Patient, "id">;
