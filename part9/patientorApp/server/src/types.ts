export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

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
  gender: Gender;
  occupation: string;
}

// Exclude the ssn field
export type NonSensitivePatient = Omit<Patient, "ssn">;

// Omit id when implementing to add a new patient
export type NewPatient = Omit<Patient, "id">;
