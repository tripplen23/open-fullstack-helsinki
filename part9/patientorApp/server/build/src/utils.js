"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toNewPatient = (object) => {
    console.log(object);
    const newPatient = {
        name: "John McClane",
        dateOfBirth: "1986-07-09",
        ssn: "090786-122X",
        gender: "male",
        occupation: "New york city cop",
    };
    return newPatient;
};
exports.default = toNewPatient;
