import { EtherealMailProvider } from "../../../../infra/providers/mail/implementations/ethereal.mail.provider";
import { DoctorSchedulePrismaRepository } from "../../../doctor/repositories/implemantations/prisma/doctor-schedule.prisma.repository";
import { DoctorPrismaRepository } from "../../../doctor/repositories/implemantations/prisma/doctor.prisma.repository";
import { PatientPrismaRepository } from "../../../patients/repositories/implementations/patient.prisma.repository";
import { AppointmentPrismaRepository } from "../../repositories/prisma/appointment.prisma.repository";
import { CreateAppointmentController } from "./create-appointment.controller";

const patientRepository = new PatientPrismaRepository()
const doctorRepository = new DoctorPrismaRepository()
const doctorScheduleRepository = new DoctorSchedulePrismaRepository()
const appointmentPrismaRepository = new AppointmentPrismaRepository()
const ethrealMailProvider = new EtherealMailProvider()

const createAppointmentController = new CreateAppointmentController(
    patientRepository, 
    doctorRepository, 
    doctorScheduleRepository, 
    appointmentPrismaRepository,
    ethrealMailProvider
)

export { createAppointmentController }