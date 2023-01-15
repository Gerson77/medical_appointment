import { DoctorSchedule } from "../entities/doctor-schedule.entity";
import { DoctorSchedules as DoctorSchedulePrisma } from "@prisma/client"
import { generateUUID } from "../../../utils/generateUUID";

export class DoctorScheduleMapper {
    static entityToPrisma = (data: DoctorSchedule): DoctorSchedulePrisma[] => {
        const doctorSchedulePrisma: DoctorSchedulePrisma[] = []

        data.schedule.forEach(schedule => {
            doctorSchedulePrisma.push({
                day_of_week: schedule.dayOfWeek,
                doctor_id: data.doctorId,
                end_at: schedule.endAt,
                start_at: schedule.startAt,
                id: schedule.id ?? generateUUID()
            })
        })

        return doctorSchedulePrisma
    }
}