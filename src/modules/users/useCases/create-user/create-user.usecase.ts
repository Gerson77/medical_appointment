import { CustomError } from "../../../../errors/custom.error";
import { ParameterRequiredError } from "../../../../errors/parameter-required.error";
import { IPasswordCrypto } from "../../../../infra/shared/crypto/password.crypto";
import { User } from "../../entities/user.entity"
import { IUserRepository } from "../../repositories/user.repository";

type UserRequest = {
    name: string,
    password: string,
    username: string
}

export class CreateUserUseCase {

    constructor(private userRepository: IUserRepository) {}

    async execute(data: UserRequest){
        const user = await User.create(data);

        if(!data.username || !data.password) {
            throw new ParameterRequiredError("Username/Password is required.", 422)
        }

        const existUser = await this.userRepository.findByUsername(data.username);

        if(existUser) {
            throw new CustomError("Username already exists", 400, "USER_EXISTS_ERROR")
        }
        
        const userCreated =  await this.userRepository.save(user);
        return userCreated;
    }
}