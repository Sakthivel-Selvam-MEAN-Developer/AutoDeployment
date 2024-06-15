import { paymentDuesProps, ppFuelProps } from '../types.ts'

export const preEventApproval = (wantFuel: boolean, fuel: ppFuelProps[]) => {
    if (wantFuel === true && fuel.length > 0) return true
    if (wantFuel === false) return true
    return false
}
export const isInitialPayAvailable = (paymentDues: paymentDuesProps[]) => {
    const initialPay = paymentDues.filter((due) => due.type === 'initial pay')
    if (initialPay.length > 0) return true
    return false
}
