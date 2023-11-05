import express from "express";
import patientService from "../services/patientService";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  res.send(patientService.getNonSensitivePatientData());
});

patientRouter.get("/:id", (req, res) => {
  const patient = patientService.findPatientById(String(req.params.id));

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
patientRouter.post("/", (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const addedPatient = patientService.addPatient(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  );
  res.json(addedPatient);
});

export default patientRouter;
