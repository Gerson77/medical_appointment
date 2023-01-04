import { CustomError } from "../../../../errors/custom.error"
import { IPasswordCrypto } from "../../../../infra/shared/crypto/password.crypto"
import { IUserRepository } from "../../repositories/user.repository"

type AuthenticateRequest = {
    username: string
    password: string
}

export class AuthenticateUserUseCase {

    constructor(private userRepository: IUserRepository, private passwordCrypto: IPasswordCrypto){}

    async execute({ username, password }: AuthenticateRequest){
        if(!username || !password) {
            throw new CustomError("Username/password incorrect", 401)
        }
        
        const user = await this.userRepository.findByUsername(username);

        if(!user){
            throw new CustomError("Username/password incorrect", 401)
        }

        const comparePasswordEquals = await this.passwordCrypto.compare(password, user.password)

        if(!comparePasswordEquals) {
            throw new CustomError("Username/password incorrect", 401)
        }

        return user;
    }
}
