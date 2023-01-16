import { DoctorSchedulePrismaRepository } from "../../repositories/implemantations/prisma/doctor-schedule.prisma.repository";
import { DoctorPrismaRepository } from "../../repositories/implemantations/prisma/doctor.prisma.repository";
import { CreateDoctorScheduleController } from "./create-doctor-schedule.controller";

const doctorPrismaRepository = new DoctorPrismaRepository()
const doctorSchedulePrismaRepository = new DoctorSchedulePrismaRepository()

const createDoctorScheduleController = new CreateDoctorScheduleController(doctorPrismaRepository, doctorSchedulePrismaRepository)



export { createDoctorScheduleController }