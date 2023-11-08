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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

// Exclude the ssn field
export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

// Omit id when implementing to add a new patient
export type NewPatient = Omit<Patient, "id" | "entries">;
