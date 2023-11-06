"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnoseService_1 = __importDefault(require("../services/diagnoseService"));
const diagnoseRouter = express_1.default.Router();
diagnoseRouter.get("/", (_req, res) => {
    res.send(diagnoseService_1.default.getDiagnoses());
});
diagnoseRouter.post("/", (_req, res) => {
    res.send("Will be modified to save a new diagnosic");
});
exports.default = diagnoseRouter;
