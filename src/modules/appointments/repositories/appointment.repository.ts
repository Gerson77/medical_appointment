import { Appointment } from "../entities/appointment.entity"

export type AppointmentDate = {
    date: Date
}

export interface IAppointmentRepository {
    findAllSchedulesByDoctorAndDate(doctorId: string, date: string): Promise<AppointmentDate[]>

    findAppointmentByDoctorAndDateTime(doctorId: string, date: string): Promise<AppointmentDate | null>
    findAppointmentByPatientAndDateTime(patientId: string, date: string): Promise<AppointmentDate>
    save(data: Appointment): Promise<void>
}