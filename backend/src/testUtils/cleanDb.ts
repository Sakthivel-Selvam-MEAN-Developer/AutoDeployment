import prisma from '../wonderMove/models/index.ts'
import prismaHrm from '../hrm/models/index.ts'

const cleanData = async () => {
    await prisma.$executeRaw`truncate "wonderMove"."customers" cascade`
    await prisma.$executeRaw`truncate "wonderMove"."vehicles" cascade`
    await prisma.$executeRaw`truncate "wonderMove"."stops" cascade`
    await prisma.$executeRaw`truncate "wonderMove"."stopReasons" cascade`
    await prisma.$executeRaw`truncate "wonderMove"."gpsStops" cascade`
    await prismaHrm.$executeRaw`truncate "peopleOrg"."leaves" cascade`
    await prismaHrm.$executeRaw`truncate "peopleOrg"."employees" cascade`
    await prismaHrm.$executeRaw`truncate "peopleOrg"."orgUnits" cascade`
    await prismaHrm.$executeRaw`truncate "peopleOrg"."orgUnitHeads" cascade`
    await prismaHrm.$executeRaw`truncate "peopleOrg"."leaveReasons" cascade`
}

export default cleanData
