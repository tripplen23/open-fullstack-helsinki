import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import diagnoseService from "../../services/diagnoses";
import { useEffect, useState } from "react";
import { Diagnosis, Patient } from "../../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

const PatientInfo = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();

  useEffect(() => {
    const fetchPatient = async () => {
      if (id !== undefined) {
        const patientData = await patientService.getById(id);
        setPatient(patientData);
      }
    };
    void fetchPatient();

    const fetchDiagnoses = async () => {
      const diagnosesData = await diagnoseService.getAll();
      setDiagnoses(diagnosesData);
    };
    void fetchDiagnoses();
  }, [id]);

  if (patient === undefined) {
    return <p>Patient not found</p>;
  }

  const findDiagnoseName = (code: string) => {
    const diagnose = diagnoses?.find((d) => d.code === code);
    return diagnose?.name;
  };

  return (
    <div>
      <h1>
        {patient.name}
        {patient.gender === "female" && <FemaleIcon></FemaleIcon>}
        {patient.gender === "male" && <MaleIcon></MaleIcon>}
      </h1>
      <p>ssn: {patient.ssn}</p>
      <p>
        occupation: {patient.occupation}
        <br />
        <br />
      </p>

      <h2>entries</h2>
      <p>
        {" "}
        {patient.entries.map((e) => (
          <div key={e.id}>
            {e.date} <em>{e.description}</em>
            <ul>
              {e.diagnosisCodes?.map((dianosisCode) => (
                <li key={dianosisCode}>
                  {dianosisCode}: {findDiagnoseName(dianosisCode)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </p>
    </div>
  );
};

export default PatientInfo;
