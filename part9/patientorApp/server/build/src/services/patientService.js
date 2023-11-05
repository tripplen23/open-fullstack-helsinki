"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patient_1 = __importDefault(require("../../data/patient"));
const getPatient = () => {
    return patient_1.default;
};
exports.default = {
    getPatient,
};
