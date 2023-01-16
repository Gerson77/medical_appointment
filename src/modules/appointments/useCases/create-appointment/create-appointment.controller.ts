import { Request, Response, response } from "express";
import { CreateAppointmentUseCase } from "./create-appointment.usecase";
import { IPatientRepository } from "../../../patients/repositories/patient.repository";
import { IDoctorScheduleRespository } from "../../../doctor/repositories/doctor-schedule.repository";
import { IAppointmentRepository } from "../../repositories/appointment.repository";
import { IDoctorRepository } from "../../../doctor/repositories/doctor.repository";

export class CreateAppointmentController {

    constructor(
        private patientRepository: IPatientRepository,
        private doctorRepository: IDoctorRepository,
        private doctorScheduleRepository: IDoctorScheduleRespository,
        private appointmentRepository: IAppointmentRepository,
    
    ) {}
    
    async handle(request: Request, response: Response) {
        const createAppointmentUseCase = new CreateAppointmentUseCase(
            this.patientRepository, 
            this.doctorRepository,
            this.doctorScheduleRepository,
            this.appointmentRepository
        )
        try{
            await createAppointmentUseCase.execute(request.body, request.userId)
            return response.status(204).end()
        }catch(err: any) {
            return response.status(err.statusCode ?? 500).json(err.message)
        }
    }
}