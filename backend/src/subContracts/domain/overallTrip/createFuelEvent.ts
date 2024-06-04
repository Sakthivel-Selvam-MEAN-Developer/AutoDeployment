import fuelLogics, { fuelDues } from '../fuelLogics.ts'
import { fuelProps, overallTrip } from '../types.ts'

export const fuelCreation = async (
    fuel: fuelProps,
    trip: overallTrip,
    bunkname: string,
    vehicleNumber: string
) => fuelLogics(fuel, trip, bunkname, vehicleNumber)

export const fuelDuesCreation = async (bunkname: string, vehicleNumber: string, fuel: fuelProps) =>
    fuelDues(bunkname, vehicleNumber, fuel)
