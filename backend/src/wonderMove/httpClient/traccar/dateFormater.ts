import dayjs from 'dayjs'

export const toTraccarFormat = (dateInEpoc: number) =>
    dayjs.unix(dateInEpoc).toISOString()

export const dateFromTraccar = (isoDate: string) => dayjs(isoDate).unix()
