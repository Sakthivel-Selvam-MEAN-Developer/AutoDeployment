import dayjs from 'dayjs'

interface Vehicle {
    insuranceExpiryDate: string;
    taxExpiryDate: string;
    npPermitDate: string;
    fiveYearPermitDate: string;
    fcDate: string;
}
export function reformatCustomerDate(vehicle: Vehicle) {
    const insuranceExpiryDate = dayjs(vehicle.insuranceExpiryDate)
    const taxExpiryDate = dayjs(vehicle.taxExpiryDate)
    const npPermitDate = dayjs(vehicle.npPermitDate)
    const fiveYearPermitDate = dayjs(vehicle.fiveYearPermitDate)
    const fcDate = dayjs(vehicle.fcDate)
    return {
        ...vehicle,
        insuranceExpiryDate,
        taxExpiryDate,
        npPermitDate,
        fiveYearPermitDate,
        fcDate,
    }
}
