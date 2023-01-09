import { test, expect, describe, beforeAll } from "vitest"
import { CreateDoctorRequest, CreateDoctorUseCase } from "../create-doctor.usecase"
import { UserMemoryRepository } from "../../../../users/repositories/implementations/user.memory.repository"
import { DoctorMemoryRepository } from "../../../repositories/implemantations/in-memory/doctor.memory.repository"
import { SpecialityMemoryRepository } from "../../../../speciality/repositories/implementations/speciality.memory.repository"
import { Speciality } from "../../../../speciality/entities/speciality.entity"
import { ISpecialityRepository } from "../../../../speciality/repositories/speciality.repository"

let specialityRepository: ISpecialityRepository
let speciality: Speciality

beforeAll(async () => {
    specialityRepository = new SpecialityMemoryRepository()

    speciality = Speciality.create({
        description: 'DESC_TEST',
        name: 'NAME_TEST'
    });

    await specialityRepository.save(speciality)
})

describe("Crete Doctor Use Case", () => {
    test("Should be able to create a new Doctor", async () => {

        const userRepository = new UserMemoryRepository()
        const doctorRepository = new DoctorMemoryRepository()
        
        const doctorMock: CreateDoctorRequest = {
            username: 'username_test',
            name: 'name_test',
            email: 'email@email.com',
            password: 'password_test',
            crm: '123456',
            specialityId: speciality.id,
        }

        const createDoctorUseCase = new CreateDoctorUseCase(userRepository, doctorRepository, specialityRepository)
        const doctorCreated = await createDoctorUseCase.execute(doctorMock)

        expect(doctorCreated).toHaveProperty('id')
    })

    test("Should not be able to create a new Doctor with exists CRM", async () => {

        const userRepository = new UserMemoryRepository()
        const doctorRepository = new DoctorMemoryRepository()

        await specialityRepository.save(speciality)

        const doctorMock: CreateDoctorRequest = {
            username: 'username_test',
            name: 'name_test',
            email: 'email@email.com',
            password: 'password_test',
            crm: '123456',
            specialityId: speciality.id,
        }

        const doctorMockDuplicated: CreateDoctorRequest = {
            username: 'username_duplicated',
            name: 'name_duplicated',
            email: 'emailDuplicated@email.com',
            password: 'password_duplicated',
            crm: '123456',
            specialityId: speciality.id,
        }


        const createDoctorUseCase = new CreateDoctorUseCase(userRepository, doctorRepository, specialityRepository)
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
            specialityId: speciality.id,
        }

        const userRepository = new UserMemoryRepository()
        const doctorRepository = new DoctorMemoryRepository()

        const createDoctorUseCase = new CreateDoctorUseCase(userRepository, doctorRepository, specialityRepository)

        expect(async () => {
            await createDoctorUseCase.execute(doctorMock)
        }).rejects.toThrowError('CRM length is incorrect!')

    })
})