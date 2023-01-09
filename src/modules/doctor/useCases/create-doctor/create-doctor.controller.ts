import { Request, Response } from "express";
import { IUserRepository } from "../../../users/repositories/user.repository";
import { IDoctorRepository } from "../../repositories/doctor.repository";
import { ISpecialityRepository } from "../../../speciality/repositories/speciality.repository";
import { CreateDoctorUseCase } from "./create-doctor.usecase";

import { string, z } from 'zod'
import { validatorSchema } from "../../../../infra/shared/validator/zod";
import { ValidationSchemaError } from "../../../../errors/validator-schema.erro";

export class CreateDoctorController {
    constructor(
        private userRepository: IUserRepository,
        private doctorRepository: IDoctorRepository,
        private specialityRepository: ISpecialityRepository
        
    ) {}
    
    async handle(request: Request, response: Response) {
        const { body } = request

        const doctorSchema = z.object({
            username: z.string(),
            name: z.string(),
            email: z.string().email({
                message: 'You need to insert a valid email'
            }),
            password: z.string(),
            crm: z.string().length(6, {
                message: 'CRM must contain 6 characters'
            }),
            specialityId: z.string().uuid({
                message: 'You need to insert a valid speciality ID'
            })
        })

        try {
            validatorSchema(doctorSchema, body)

            const createDoctorUserCase = new CreateDoctorUseCase(
                this.userRepository, 
                this.doctorRepository, 
                this.specialityRepository
            )
            const doctorCreated = await createDoctorUserCase.execute(body)
            return response.json(doctorCreated)
        }catch(err: any) {
            if(err instanceof ValidationSchemaError) {
                return response.status(err.statusCode).json(err.errors)
            }
            return response.status(err.statusCode).json(err.message)
        }
    }
}