import { Patient } from "../entities/patient.entity";

export interface IPatientRepository {
    save(data: Patient): Promise<Patient>
}