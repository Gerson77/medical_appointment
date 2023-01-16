import { CustomError } from "../../../../errors/custom.error"
import { dateToString, formatDateUTC, getDayOfWeek, toDate } from "../../../../utils/date"
import { IDoctorScheduleRespository } from "../../../doctor/repositories/doctor-schedule.repository"
import { IDoctorRepository } from "../../../doctor/repositories/doctor.repository"
import { IPatientRepository } from "../../../patients/repositories/patient.repository"
import { Appointment } from "../../entities/appointment.entity"
import { IAppointmentRepository } from "../../repositories/appointment.repository"

export type CreateAppointRequest = {
    doctorId: string
    date: Date
}

export class CreateAppointmentUseCase{
    constructor(
        private patientRepository: IPatientRepository, 
        private doctorRepository: IDoctorRepository,
        private doctorScheduleRepository: IDoctorScheduleRespository,
        private appointmentRepository: IAppointmentRepository
    ) {}

    async execute(data: CreateAppointRequest, userId: string){
        const patientExists = await this.patientRepository.findByUserId(userId)

        if(!patientExists) {
            throw new CustomError("Patient does not exists!")
        }

        const doctorExists = await this.doctorRepository.findById(data.doctorId)

        if(!doctorExists) {
            throw new CustomError("Doctor does not exists!")
        }

        const dayOfWeek = getDayOfWeek(dateToString(data.date))

        const doctorSchedule = await this.doctorScheduleRepository.findByDoctorIdAndDayOfWeek(data.doctorId, dayOfWeek)

        if(!doctorSchedule) {
            throw new CustomError('Doctor does not attend that day!')
        }

        const dateFormat = formatDateUTC(data.date, 'YYYY-MM-DD HH:mm')

        const existsAppointmentDoctor = await this.appointmentRepository.findAppointmentByDoctorAndDateTime(
            doctorExists.id, dateFormat
        )

        if(existsAppointmentDoctor) {
            throw new CustomError('There is already an appointment for this time!')
        }

        const existsAppointmentPatient = await this.appointmentRepository.findAppointmentByPatientAndDateTime(doctorExists.id, dateFormat)
        
        if(existsAppointmentPatient) {
            throw new CustomError('There is already an appointment for this patient!')
        }

        const appointment = Appointment.create({
            date: toDate(data.date),
            doctorId: doctorExists.id,
            patientId: patientExists.id
        })

        await this.appointmentRepository.save(appointment)
    }
}