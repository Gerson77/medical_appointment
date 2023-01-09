import dayjs from "dayjs"

export function validateTime(time: string) {

    return dayjs(formatDateHour(time)).isValid()
}

export function formatDateHour(time: string) {
    const date = dayjs().format('YYYY-MM-DD')
    const dateTimeFormat = new Date(`${date} ${time}`)
    return dayjs(dateTimeFormat)
}

export function compareEndTimeIsAfter(startTime: string, endTime: string) {
    return formatDateHour(endTime).isAfter(formatDateHour(startTime))
}

