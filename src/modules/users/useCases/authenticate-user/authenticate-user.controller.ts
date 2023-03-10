import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./authenticate-user.usecase";
import { IUserRepository } from "../../repositories/user.repository";
import { IPasswordCrypto } from "../../../../infra/shared/crypto/password.crypto";
import { IToken } from "../../../../infra/shared/token/token";

export class AuthenticateUserController {
    constructor(private userRepository: IUserRepository, private passwordCrypt: IPasswordCrypto, private token: IToken){}

    async handle(request: Request, response: Response) {
        try{
            const data = request.body;
            const authenticateUserUseCase = new AuthenticateUserUseCase(this.userRepository, this.passwordCrypt, this.token)

            const result = await authenticateUserUseCase.execute(data)
            return response.json(result)
        }catch(err: any) {
            return response.status(404).json({
                error: err.message,
            })
        }
    }   
}