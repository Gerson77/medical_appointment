import { describe, expect, test } from "vitest";
import dayjs from "dayjs";
import { CreateDoctorInfoUseCase, DoctorInfoRequest } from "../create-doctor-info.usecase";
import { DoctorMemoryRepository } from "../../../repositories/implemantations/doctor.memory.repository";
import { generateUUID } from "../../../../../utils/generateUUID";

describe("Create doctor Indo", () => {
    test('Should not be able to create a doctor info if doctor does not exists!', () => {
        const doctorRepository = new DoctorMemoryRepository()
        const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(doctorRepository);

        const doctorInfo: DoctorInfoRequest = {
            startAt: dayjs().startOf('day').add(10, 'hour').format("HH:mm"),
            endAt: dayjs().startOf('day').add(18, 'hour').format("HH:mm"),
            price: 150,
            duration: 10
        }
        expect(async() => {
            await createDoctorInfoUseCase.execute(doctorInfo,'INVALID_USER')
        }).rejects.toThrow('Doctor does not exists!')

    })

    test('Should not be able to create a doctor info if endAt is before startAt', async () => {
        const doctorRepository = new DoctorMemoryRepository()
        const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(
          doctorRepository,
        )
    
        const userId = generateUUID()
    
        await doctorRepository.save({
          crm: '123456',
          email: 'doctor@test.com.br',
          id: generateUUID(),
          specialityId: generateUUID(),
          userId
        })
    
        const doctorInfo: DoctorInfoRequest = {
          startAt: dayjs().startOf('day').add(18, 'hour').format('HH:mm'), 
          endAt: dayjs().startOf('day').add(10, 'hour').format('HH:mm'), 
          price: 150,
          duration: 10,
        }
    
        expect(async () => {
          await createDoctorInfoUseCase.execute(doctorInfo, userId)
        }).rejects.toThrow('End time connot be earlier than start time!')
    })

    test('Should not be able to create a doctor info if endAt is invalid', async () => {
        const doctorRepository = new DoctorMemoryRepository()
        const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(
          doctorRepository,
        )
    
        const userId = generateUUID()
    
        await doctorRepository.save({
          crm: '123456',
          email: 'doctor@test.com.br',
          id: generateUUID(),
          specialityId: generateUUID(),
          userId
        })
    
        const doctorInfo: DoctorInfoRequest = {
          endAt: '99:99', 
          startAt: dayjs().startOf('day').add(18, 'hour').format('HH:mm'), 
          price: 150,
          duration: 10,
        }
    
        expect(async () => {
          await createDoctorInfoUseCase.execute(doctorInfo, userId)
        }).rejects.toThrow('Invalid EndAt')
    })
    
    test('Should not be able to create a doctor info if StartAt is invalid', async () => {
        const doctorRepository = new DoctorMemoryRepository()
        const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(
          doctorRepository,
        )
    
        const userId = generateUUID()
    
        await doctorRepository.save({
          crm: '123456',
          email: 'doctor@test.com.br',
          id: generateUUID(),
          specialityId: generateUUID(),
          userId
        })
    
        const doctorInfo: DoctorInfoRequest = {
          endAt: '18:00',
          startAt: '99:00', 
          price: 150,
          duration: 10,
        }
    
        expect(async () => {
          await createDoctorInfoUseCase.execute(doctorInfo, userId)
        }).rejects.toThrow('Invalid StartAt')
    })
})