import dayjs from 'dayjs'
import { createContext } from 'react'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
export const paymentDueContext = createContext(dayjs.utc().startOf('day').unix())
