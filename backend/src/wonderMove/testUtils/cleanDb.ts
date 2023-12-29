import prisma from '../../../prisma/index.ts'

const cleanData = async () => {
    await prisma.$executeRaw`truncate "wonderMove"."customers" cascade`
    await prisma.$executeRaw`truncate "wonderMove"."vehicles" cascade`
    await prisma.$executeRaw`truncate "wonderMove"."stops" cascade`
    await prisma.$executeRaw`truncate "wonderMove"."people" cascade`
    await prisma.$executeRaw`truncate "wonderMove"."stopReasons" cascade`
    await prisma.$executeRaw`truncate "wonderMove"."gpsStops" cascade`
    await prisma.$executeRaw`truncate "wonderMove"."traccarDevice" cascade`
    await prisma.$executeRaw`truncate "wonderMove"."loconavDevice" cascade`
    await prisma.$executeRaw`truncate "wonderMove"."vehicleMovements" cascade`
    await prisma.$executeRaw`truncate "wonderMove"."ktTelematicsDevice" cascade`
    await prisma.$disconnect()
}

export default cleanData
