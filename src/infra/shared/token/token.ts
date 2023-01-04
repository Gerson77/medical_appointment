import { User } from "../../../modules/users/entities/user.entity";

export interface IToken {
    
    create(user: User): string
}