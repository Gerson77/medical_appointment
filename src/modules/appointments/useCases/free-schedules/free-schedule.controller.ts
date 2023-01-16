import { Request, Response } from "express";
import { FreeSchedulesUseCase } from "./free-schedules.usecase";
import { IAppointmentRepository } from "../../repositories/appointment.repository";
import { IDoctorScheduleRespository } from "../../../doctor/repositories/doctor-schedule.repository";

export class FreeSchedulesController {
    constructor(
        private doctorSchedulesRepository: IDoctorScheduleRespository,
        private appointmentRepository: IAppointmentRepository
    ){}

    async handle(request: Request, response: Response) {
        const freeSchedulesUseCase = new FreeSchedulesUseCase(this.doctorSchedulesRepository, this.appointmentRepository)
    
        try {
            const result = await freeSchedulesUseCase.execute(request.body)
            return response.json(result)
        }catch(err: any) {
            return response.status(err.statusCode ?? 500).json(err.message)
        }
    }
}