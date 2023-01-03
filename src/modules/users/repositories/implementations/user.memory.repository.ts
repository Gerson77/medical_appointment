import { User } from "../../entities/user.entity"
import { IUserRepository } from "../user.repository";

export class UserMemoryRepository implements IUserRepository {
    users: User[] 

    constructor(){
        this.users = []
    }

    private static instance: UserMemoryRepository;

    static getInstance(){
        if(!UserMemoryRepository.instance) {
            UserMemoryRepository.instance = new UserMemoryRepository();
        }

        return UserMemoryRepository.instance;
    }

    async findByUsername(username: string){
        return this.users.find(user => user.username === username)
    }

    async save(data: User) {
        this.users.push(data)
        return data;
    }
}