import { CustomError } from "../../../../errors/custom.error";
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


        const existSpeciality = await this.specialityRepositoty.findByName(data.name)

        if(existSpeciality) {
            throw new CustomError("Speciality already exists!")
        }

        const specialityCreated = await this.specialityRepositoty.save(speciality)
        return specialityCreated
    }
}