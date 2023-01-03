import { Speciality } from "../entities/speciality.entity";

export interface ISpecialityRepository {
    save(data: Speciality): Promise<Speciality>
}