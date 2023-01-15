import { CustomError } from "../../../errors/custom.error"
import { generateUUID } from "../../../utils/generateUUID"

export type DoctorInfoProps = {
    duration: number
    price: number
    doctorId: string
}

export class DoctorInfo {
    id: string
    duration: number
    price: number
    doctorId: string

    private constructor(props: DoctorInfoProps) {

        if(!props.doctorId) {
            throw new CustomError('Doctor does not exists!')
        }

        if(props.duration <= 0) {
            throw new CustomError('invalid duration!')
        }


        this.id = generateUUID()
        this.duration = props.duration
        this.price = props.price
        this.doctorId = props.doctorId
    }

    static create(data: DoctorInfoProps) {
        const doctorInfo = new DoctorInfo(data)
        return doctorInfo
    }
}