import { CustomError } from "../../../../errors/custom.error"
import { DoctorSchedule } from "../../entities/doctor-schedule.entity"
import { IDoctorScheduleRespository } from "../../repositories/doctor-schedule.repository"
import { IDoctorRepository } from "../../repositories/doctor.repository"

export type CreateDoctorScheduleRequest = {
    schedules: DoctorSchedulesRequest[]
}

type DoctorSchedulesRequest = {
    startAt: string
    dayOfWeek: number
    endAt: string

}

export class CreateDoctorScheduleUseCase {
    constructor(private doctorRepository: IDoctorRepository, private doctorScheduleRepository: IDoctorScheduleRespository) {}

    async execute(data: CreateDoctorScheduleRequest, userId: string){
        const doctor = await this.doctorRepository.findByUserID(userId)

        if(!doctor) {
            throw new CustomError("Doctor does not exists!", 400)
        }

        const doctorSchedule = DoctorSchedule.create({
            schedules: data.schedules,
            doctorId: doctor.id
        })
        await this.doctorScheduleRepository.save(doctorSchedule)
    }

}