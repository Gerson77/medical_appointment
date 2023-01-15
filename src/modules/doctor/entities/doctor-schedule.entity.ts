import { CustomError } from "../../../errors/custom.error"
import { compareEndTimeIsAfter, validateTime } from "../../../utils/date"
import { generateUUID } from "../../../utils/generateUUID"

type Schedules = {
    endAt: string
    startAt: string
    dayOfWeek: number
    id?: string
}

type DoctorScheduleProps = {
    doctorId: string
    schedules: Schedules[]
}

export class DoctorSchedule {
    doctorId: string
    schedule: Schedules[]

    constructor(props: DoctorScheduleProps) {
        if(!props.schedules) {
            throw new CustomError('Invalid schedules', 400)
        }

        validDuplicateSchedules(props.schedules)
        validTimes(props.schedules)
        
        this.doctorId = props.doctorId
        this.schedule = createSchedules(props.schedules)
    }

    static create(data: DoctorScheduleProps) {
        const doctorSchedule = new DoctorSchedule(data)
        return doctorSchedule
    }
}

const validDuplicateSchedules = (schedules: Schedules[]) => {
    const hasUniqueValue = new Set(schedules.map(value => value.dayOfWeek))

    if(hasUniqueValue.size < schedules.length) {
        throw new CustomError('Duplicate Day of Week', 400)
    }
}

const validTimes = (schedules: Schedules[]) => {
    schedules.forEach(schedule => {

        if(!validateTime(schedule.startAt))  {
            throw new CustomError('Invalid StartAt')
        }

        if(!validateTime(schedule.endAt))  {
            throw new CustomError('Invalid EndAt')
        }

        if(!compareEndTimeIsAfter(schedule.startAt, schedule.endAt)) {
            throw new CustomError('End time connot be earlier than start time!')
        }
    })
}

const createSchedules = (schedule: Schedules[]) => {
    return schedule.map(schedule => {
        return {
            ...schedule,
            id: generateUUID()
        }
    })
}