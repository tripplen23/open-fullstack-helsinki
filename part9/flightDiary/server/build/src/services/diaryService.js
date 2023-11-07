"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: Take care of the data manipulation
const diaries_1 = __importDefault(require("../../data/diaries"));
const getEntries = () => {
    return diaries_1.default;
};
const getNonSensitiveEntries = () => {
    return diaries_1.default.map(({ id, date, weather, visibility }) => ({
        id,
        date,
        weather,
        visibility,
    }));
};
const findById = (id) => {
    const entry = diaries_1.default.find((d) => d.id === id);
    return entry;
};
const addDiary = (entry) => {
    const newDiaryEntry = Object.assign({ id: Math.max(...diaries_1.default.map((d) => d.id)) + 1 }, entry);
    diaries_1.default.push(newDiaryEntry);
    return newDiaryEntry;
};
exports.default = {
    getEntries,
    addDiary,
    getNonSensitiveEntries,
    findById,
};
