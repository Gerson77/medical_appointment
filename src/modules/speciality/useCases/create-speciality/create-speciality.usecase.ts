import { Speciality } from "../../entities/speciality.entity"
import { ISpecialityRepository } from "../../repositories/speciality.repository";

type SpecialityRequest = {
    name: string,
    description: string
}

export class CreateSpecialityUseCase {
    
    constructor(private specialityRepositoty: ISpecialityRepository) {}

    async execute(data: SpecialityRequest){
        const speciality = new Speciality(data);

        const specialityCreated = await this.specialityRepositoty.save(speciality)
        return specialityCreated
    }
}