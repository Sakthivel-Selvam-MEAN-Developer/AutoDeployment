import dayjs from 'dayjs'
import { createContext } from 'react'

export const paymentDueContext = createContext(dayjs().startOf('day').unix())
