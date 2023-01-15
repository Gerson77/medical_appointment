import { DoctorSchedule } from "../entities/doctor-schedule.entity";

export interface IDoctorScheduleRespository {
    save(data: DoctorSchedule): Promise<void>
}