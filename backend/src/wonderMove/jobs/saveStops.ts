import computeStops, { Movement } from './computeStops.ts'
import { createMany } from '../models/gpsStop.ts'
import { createMany as createMovements } from '../models/movement.ts'
import prisma from '../../../prisma/index.ts'

export const saveStops = async (
    movementsInGenericFormat: Movement[],
    vehicleId: number,
    source: string
) => {
    const rawStops = computeStops(movementsInGenericFormat)
    const gpsStop = rawStops.map((stop) => ({ ...stop, vehicleId, source }))
    await prisma.$transaction([createMany(gpsStop), createMovements(movementsInGenericFormat)])
}
