import express from "express";
import diagnoseService from "../services/diagnoseService";

const diagnoseRouter = express.Router();

diagnoseRouter.get("/", (_req, res) => {
  res.send(diagnoseService.getDiagnoses());
});

diagnoseRouter.post("/", (_req, res) => {
  res.send("Will be modified to save a new diagnosic");
});

export default diagnoseRouter;
