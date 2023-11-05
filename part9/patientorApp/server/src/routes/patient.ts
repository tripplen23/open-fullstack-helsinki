import express from "express";
import patientService from "../services/patientService";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  res.send(patientService.getNonSensitivePatientData());
});

patientRouter.post("/", (_req, res) => {
  res.send("Will be modified to save a new patient");
});

export default patientRouter;
