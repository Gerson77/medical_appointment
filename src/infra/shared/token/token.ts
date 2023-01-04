import { User } from "../../../modules/users/entities/user.entity";

export type TokenUser = {
    sub: string
}

export interface IToken {
    create(user: User): string
    valite(token: string): TokenUser | null
}