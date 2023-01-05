import { test, expect, describe } from "vitest"
import { randomUUID } from 'crypto'
import { CreateDoctorRequest, CreateDoctorUseCase } from "../create-doctor.usecase"
import { UserMemoryRepository } from "../../../../users/repositories/implementations/user.memory.repository"
import { DoctorMemoryRepository } from "../../../repositories/implemantations/doctor.memory.repository"


describe("Crete Doctor Use Case", () => {
    test("Should be able to create a new Doctor", async () => {

        const doctorMock: CreateDoctorRequest = {
            username: 'username_test',
            name: 'name_test',
            email: 'email@email.com',
            password: 'password_test',
            crm: '123456',
            specialityId: randomUUID(),
        }

        const userRepository = new UserMemoryRepository()
        const doctorRepository = new DoctorMemoryRepository()

        const createDoctorUseCase = new CreateDoctorUseCase(userRepository, doctorRepository)
        const doctorCreated = await createDoctorUseCase.execute(doctorMock)

        expect(doctorCreated).toHaveProperty('id')
    })

    test("Should not be able to create a new Doctor with exists CRM", async () => {

        const doctorMock: CreateDoctorRequest = {
            username: 'username_test',
            name: 'name_test',
            email: 'email@email.com',
            password: 'password_test',
            crm: '123456',
            specialityId: randomUUID(),
        }

        const doctorMockDuplicated: CreateDoctorRequest = {
            username: 'username_duplicated',
            name: 'name_duplicated',
            email: 'emailDuplicated@email.com',
            password: 'password_duplicated',
            crm: '123456',
            specialityId: randomUUID(),
        }

        const userRepository = new UserMemoryRepository()
        const doctorRepository = new DoctorMemoryRepository()

        const createDoctorUseCase = new CreateDoctorUseCase(userRepository, doctorRepository)
        await createDoctorUseCase.execute(doctorMock)

        expect(async () => {
            await createDoctorUseCase.execute(doctorMockDuplicated)
        }).rejects.toThrowError('CRM already exists')

    })

    test("Should not be able to create a new Doctor with exists CRM length invalid", async () => {

        const doctorMock: CreateDoctorRequest = {
            username: 'username_test',
            name: 'name_test',
            email: 'email@email.com',
            password: 'password_test',
            crm: '12345',
            specialityId: randomUUID(),
        }

        const userRepository = new UserMemoryRepository()
        const doctorRepository = new DoctorMemoryRepository()

        const createDoctorUseCase = new CreateDoctorUseCase(userRepository, doctorRepository)

        expect(async () => {
            await createDoctorUseCase.execute(doctorMock)
        }).rejects.toThrowError('CRM length is incorrect!')

    })
})