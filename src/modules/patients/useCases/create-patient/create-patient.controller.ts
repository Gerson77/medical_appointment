import { Request, Response } from "express";
import { IUserRepository } from "../../../users/repositories/user.repository";
import { IPatientRepository } from "../../repositories/patient.repository";
import { CreatePatientUseCase } from "./create-patient.usecase";

export class CreatePatientController {

    constructor(private userRepository: IUserRepository, private patientRepository: IPatientRepository){}

    async handle(request: Request, response: Response) {
        try {
            const createPatientUseCase = new CreatePatientUseCase(this.userRepository, this.patientRepository)

            const result = await createPatientUseCase.execute(request.body)
            return response.json(result)
        }catch(err: any) {
            return response.status(err.statusCode || 400).json(err.message)
        }
    }
}