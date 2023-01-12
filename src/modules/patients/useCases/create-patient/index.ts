import { UserPrismaRepository } from "../../../users/repositories/implementations/user.prisma.repository";
import { PatientPrismaRepository } from "../../repositories/implementations/patient.prisma.repository";
import { CreatePatientController } from "./create-patient.controller";

const useRepository = new UserPrismaRepository
const patientRepository = new PatientPrismaRepository()

const createPatientController = new CreatePatientController(useRepository, patientRepository)


export { createPatientController }
