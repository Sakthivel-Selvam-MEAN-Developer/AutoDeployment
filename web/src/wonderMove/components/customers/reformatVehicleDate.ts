import dayjs from 'dayjs'

interface Vehicle {
    insuranceExpiryDate: string
    taxExpiryDate: string
    npPermitDate: string
    fiveYearPermitDate: string
    fcDate: string
}
export function reformatCustomerDate(vehicle: Vehicle) {
    return {
        ...vehicle,
        insuranceExpiryDate: dayjs(vehicle.insuranceExpiryDate),
        taxExpiryDate: dayjs(vehicle.taxExpiryDate),
        npPermitDate: dayjs(vehicle.npPermitDate),
        fiveYearPermitDate: dayjs(vehicle.fiveYearPermitDate),
        fcDate: dayjs(vehicle.fcDate)
    }
}
