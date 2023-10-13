import dayjs from 'dayjs'

export function reformatVehicleDate(vehicles) {
    const insuranceExpiryDate = dayjs(vehicles.insuranceExpiryDate)
    const taxExpiryDate = dayjs(vehicles.taxExpiryDate)
    const npPermitDate = dayjs(vehicles.npPermitDate)
    const fiveYearPermitDate = dayjs(vehicles.fiveYearPermitDate)
    const fcDate = dayjs(vehicles.fcDate)
    const startTime = dayjs(vehicles.startTime)
    const endTime = dayjs(vehicles.endTime)

    return {
        ...vehicles,
        insuranceExpiryDate,
        taxExpiryDate,
        npPermitDate,
        fiveYearPermitDate,
        fcDate,
        startTime,
        endTime
    }
}
