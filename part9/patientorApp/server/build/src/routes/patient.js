"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const patientRouter = express_1.default.Router();
patientRouter.get("/", (_req, res) => {
    res.send(patientService_1.default.getNonSensitivePatientData());
});
patientRouter.get("/:id", (req, res) => {
    const patient = patientService_1.default.findPatientById(String(req.params.id));
    if (patient) {
        res.send(patient);
    }
    else {
        res.sendStatus(404);
    }
});
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
patientRouter.post("/", (req, res) => {
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const addedPatient = patientService_1.default.addPatient(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    name, dateOfBirth, ssn, gender, occupation);
    res.json(addedPatient);
});
exports.default = patientRouter;
