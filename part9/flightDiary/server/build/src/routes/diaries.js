"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diaryService_1 = __importDefault(require("../services/diaryService"));
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    res.send(diaryService_1.default.getNonSensitiveEntries());
});
router.get("/:id", (req, res) => {
    const diary = diaryService_1.default.findById(Number(req.params.id));
    if (diary) {
        res.send(diary);
    }
    else {
        res.sendStatus(404);
    }
});
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
router.post("/", (req, res) => {
    const { date, weather, visibility, comment } = req.body;
    const addedEntry = diaryService_1.default.addDiary({
        date,
        weather,
        visibility,
        comment,
    });
    res.json(addedEntry);
});
exports.default = router;
