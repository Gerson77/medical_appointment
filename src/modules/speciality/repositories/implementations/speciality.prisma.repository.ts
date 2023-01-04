import { prismaClient } from "../../../../infra/databases/prisma.config";
import { Speciality } from "../../entities/speciality.entity";
import { ISpecialityRepository } from "../speciality.repository";

export class SpecialityPrismaRepository implements ISpecialityRepository {
    async save(data: Speciality): Promise<Speciality> {
        const speciality = await prismaClient.specialy.create({
            data: {
                name: data.name,
                description: data.description,
                id: data.id
            },
        })
        return speciality
    }

    async findByName(name: string): Promise<Speciality | null> {
        return await prismaClient.specialy.findUnique({
            where: {
                name
            }
        })
    }
}