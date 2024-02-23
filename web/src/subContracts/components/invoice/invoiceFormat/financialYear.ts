import dayjs from 'dayjs'

export const financialYear =
    dayjs().month() < 3
        ? `${dayjs().year() - 1}-${dayjs().year()}`
        : `${dayjs().year()}-${dayjs().year() + 1}`
