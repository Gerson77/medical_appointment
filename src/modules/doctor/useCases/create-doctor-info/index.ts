import { DoctorInfoPrismaRepository } from "../../repositories/implemantations/prisma/doctor-info.prisma.repository";
import { DoctorPrismaRepository } from "../../repositories/implemantations/prisma/doctor.prisma.repository";
import { CreateDoctorInfoController } from "./create-doctor-info.controller";

const doctorController = new DoctorPrismaRepository()
const doctorInfoRepository = new DoctorInfoPrismaRepository();

const createDoctorInfoController  = new CreateDoctorInfoController(doctorController, doctorInfoRepository)

export { createDoctorInfoController }