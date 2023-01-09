import { DoctorInfo } from "../entities/doctor-info.entity";
import { DoctorInfo as DoctorInfoPrisma } from "@prisma/client";

export class DoctorInfoMapper {
    static primaToEntityDoctorInfo = (data: DoctorInfoPrisma): DoctorInfo => {
        return {
            doctorId: data.doctor_id,
            duration: data.duration,
            endAt: data.end_at,
            startAt: data.start_at,
            price: Number(data.price),
            id: data.id
        }
    }
}