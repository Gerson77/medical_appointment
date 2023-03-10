import { SpecialityPrismaRepository } from "../../../speciality/repositories/implementations/speciality.prisma.repository";
import { UserPrismaRepository } from "../../../users/repositories/implementations/user.prisma.repository";
import { DoctorPrismaRepository } from "../../repositories/implemantations/prisma/doctor.prisma.repository";
import { CreateDoctorController } from "./create-doctor.controller";

const userRepository = new UserPrismaRepository();
const doctorRepository = new DoctorPrismaRepository()
const specialityRepository = new SpecialityPrismaRepository();

const createDoctorController = new CreateDoctorController(userRepository, doctorRepository, specialityRepository)

export { createDoctorController }