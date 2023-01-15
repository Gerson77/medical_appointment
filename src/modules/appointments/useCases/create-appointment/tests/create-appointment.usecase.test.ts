import { describe, expect, test } from "vitest";
import { generateUUID } from "../../../../../utils/generateUUID";
import { CreateAppointmentUseCase } from "../create-appointment.usecase";
import { PatientInMemoryRepository } from "../../../../patients/repositories/implementations/patient.memory.repository";
import { DoctorMemoryRepository } from "../../../../doctor/repositories/implemantations/in-memory/doctor.memory.repository";


describe("Create appointment", () => {
    test("Should not be able create an appointmet without a patient or with an invalid patient", async () => {
        const patientInMemoryRepository = new PatientInMemoryRepository()
        const doctorMemoryRepository = new DoctorMemoryRepository()
        const createAppointmentUseCase = new CreateAppointmentUseCase(patientInMemoryRepository, doctorMemoryRepository)


        expect(async () => {
            await createAppointmentUseCase.execute({
                doctorId: generateUUID(),
                date: new Date()
            },
            'ID_INVALID')
        }).rejects.toThrow("Patient does not exists!")
    })

    test("Should not be able create an appointmet without a doctor or with an invalid doctor", async () => {
        const patientInMemoryRepository = new PatientInMemoryRepository()
        const doctorMemoryRepository = new DoctorMemoryRepository()
        const createAppointmentUseCase = new CreateAppointmentUseCase(patientInMemoryRepository, doctorMemoryRepository)


        const patient = await patientInMemoryRepository.save({
            document: 'DOCUMENT_PATIENT',
            email: 'patient@email.com',
            id: generateUUID(),
            userId: generateUUID()
        })

        expect(async () => {
            await createAppointmentUseCase.execute({
                doctorId: generateUUID(),
                date: new Date()
            },
            patient.userId)
        }).rejects.toThrow("Doctor does not exists!")
    })
})