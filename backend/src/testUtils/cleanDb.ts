import prisma from '../../prisma/index.ts'

const cleanData = async () => {
    await prisma.$executeRaw`truncate "wonderMove"."customers" cascade`
    await prisma.$executeRaw`truncate "wonderMove"."vehicles" cascade`
    await prisma.$executeRaw`truncate "wonderMove"."stops" cascade`
    await prisma.$executeRaw`truncate "wonderMove"."stopReasons" cascade`
    await prisma.$executeRaw`truncate "wonderMove"."gpsStops" cascade`
    await prisma.$executeRaw`truncate "peopleOrg"."leaves" cascade`
    await prisma.$executeRaw`truncate "peopleOrg"."employees" cascade`
    await prisma.$executeRaw`truncate "peopleOrg"."orgUnits" cascade`
    await prisma.$executeRaw`truncate "peopleOrg"."orgUnitHeads" cascade`
    await prisma.$executeRaw`truncate "peopleOrg"."leaveReasons" cascade`
}

export default cleanData
