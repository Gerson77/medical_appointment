import { CustomError } from "../../../../errors/custom.error"
import { IDoctorRepository } from "../../../doctor/repositories/doctor.repository"
import { IPatientRepository } from "../../../patients/repositories/patient.repository"

export type CreateAppointRequest = {
    doctorId: string
    date: Date
}

export class CreateAppointmentUseCase{
    constructor(private patientRepository: IPatientRepository, private doctorRepository: IDoctorRepository) {}

    async execute(data: CreateAppointRequest, userId: string){
        const patientExists = await this.patientRepository.findByUserId(userId)

        if(!patientExists) {
            throw new CustomError("Patient does not exists!")
        }

        const doctorExists = await this.doctorRepository.findById(data.doctorId)

        if(!doctorExists) {
            throw new CustomError("Doctor does not exists!")
        }

    }
}