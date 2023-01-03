import { User } from "../../entities/user.entity";
import { IUserRepository } from "../user.repository";

export class UserPrismaRepository implements IUserRepository {
    findByUsername(username: string): Promise<User | undefined> {
        throw new Error("Method not implemented.")
    }
    save(data: User): Promise<User> {
        throw new Error("Method not implemented.")
    }
}