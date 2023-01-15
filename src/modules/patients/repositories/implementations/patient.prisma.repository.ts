import { prismaClient } from "../../../../infra/databases/prisma.config";
import { Patient } from "../../entities/patient.entity";
import { PatientMapper } from "../../mapper/patient.map";
import { IPatientRepository } from "../patient.repository";

export class PatientPrismaRepository implements IPatientRepository {
    
    async save(data: Patient): Promise<Patient> {
        const patient = await prismaClient.patient.create({
            data: PatientMapper.entityToPrisma(data),
        })
        return PatientMapper.prismaToEntity(patient)
    }
    
    async findByDocumentOrEmail(document: string, email: string): Promise<Patient | null> {
        const patient = await prismaClient.patient.findFirst({
            where: {
                OR: [
                    {
                        email: {
                            contains: email
                        },
                    },
                    {
                        document: {
                            contains: document
                        }
                    }
                ]
            }
        })
        if(patient) {
            return PatientMapper.prismaToEntity(patient)
        }
        return null
    }

    async findById(id: string): Promise<Patient | null> {
        const patient = await prismaClient.patient.findUnique({
            where: {
                id
            }
        })
        if(patient) {
            return PatientMapper.prismaToEntity(patient)
        }
        return null
    }
    

    async findByUserId(userId: string): Promise<Patient | null> {
        const patient = await prismaClient.patient.findUnique({
            where: {
                user_id: userId
            }
        })
        if(patient) {
            return PatientMapper.prismaToEntity(patient)
        }
        return null
    }
}