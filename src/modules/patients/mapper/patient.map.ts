import { Patient } from "../entities/patient.entity";
import { Patient as PatientPrisma } from "@prisma/client"

export class PatientMapper {
    static entityToPrisma = (patient: Patient): PatientPrisma => {
        return {
            ...patient,
            user_id: patient.userId
        }
    }
    static prismaToEntity = (patient: PatientPrisma): Patient => {
        return {
            ...patient,
            userId: patient.user_id
        }
    }
}