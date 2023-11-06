import { NewPatient, Gender } from "./types";

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  console.log(object);

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parsessn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    };

    return newPatient;
  }

  throw new Error("Incorrect data: some fields are missing");
};

// TODO: Parser
const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Missing or Incorrect name: " + name);
  }

  return name;
};

const parsessn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Missing or Incorrect ssn: " + ssn);
  }

  return ssn;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth)) {
    throw new Error("Missing or Incorrect date of birth: " + dateOfBirth);
  }

  return dateOfBirth;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Missing or Incorrect occupation: " + occupation);
  }

  return occupation;
};

// TODO: Type guards
const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(param);
};

export default toNewPatient;
