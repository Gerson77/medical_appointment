import { DoctorSchedule } from "../../../entities/doctor-schedule.entity";
import { IDoctorScheduleRespository } from "../../doctor-schedule.repository";
import { prismaClient } from "../../../../../infra/databases/prisma.config";
import { DoctorScheduleMapper } from "../../../mapper/doctor-schedule.map";

export class DoctorSchedulePrismaRepository implements IDoctorScheduleRespository {
    async save(data: DoctorSchedule): Promise<void> {
        await prismaClient.doctorSchedules.createMany({
            data: DoctorScheduleMapper.entityToPrisma(data)
        })
    }
}