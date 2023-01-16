import dayjs from "dayjs"
import { CustomError } from "../../../../errors/custom.error"
import { dateToString, formatDate, getDayOfWeek } from "../../../../utils/date"
import { IDoctorScheduleRespository } from "../../../doctor/repositories/doctor-schedule.repository"
import { IAppointmentRepository } from "../../repositories/appointment.repository"

type FreeSchedulesRequest = {
    doctorId: string
    date: string
}

type FreeTime = {
    time: string
}

type FreeSchedulesResponse = {
    doctorId: string
    freeTime: FreeTime[]
}

export class FreeSchedulesUseCase {

    constructor(
        private doctorScheduleRepository: IDoctorScheduleRespository, 
        private appoitmentRepository: IAppointmentRepository
    ) {}

    async execute(data: FreeSchedulesRequest): Promise<FreeSchedulesResponse> {
        if(!data.doctorId) {
            throw new CustomError('Doctor is required', 400)
        }
        
        if(!data.date) {
            throw new CustomError('You need to select a date', 400)
        }
        const dayOfWeek = getDayOfWeek(data.date)

        const doctorSchedule = await this.doctorScheduleRepository.findByDoctorIdAndDayOfWeek(data.doctorId, dayOfWeek)

        if(!doctorSchedule) {
            throw new CustomError('Doctor does not attend that day!')
        }

        const appointmentsByDoctorAndDate = await this.appoitmentRepository.findAllSchedulesByDoctorAndDate(
            data.doctorId, 
            data.date
        )

        const startAt = doctorSchedule.startAt;
        const endAt = doctorSchedule.endAt
        const duration = doctorSchedule.doctor.doctorInfo.duration

        let timeNow = startAt
        const freeTime: FreeTime[] = []

        while(timeNow <= endAt) {
            const existsAppointment = appointmentsByDoctorAndDate.find(appointment => {
                const appointmentDateFormat = formatDate(appointment.date, 'HH:mm')
                return appointmentDateFormat === timeNow
            })

            if(!existsAppointment) {
                freeTime.push({
                    time: timeNow
                })
            }
            timeNow = dayjs(data.date + timeNow).add(duration, 'minute').format('HH:mm')
        }

        return {
            doctorId: data.doctorId,
            freeTime
        }
    }
}