import prisma from '../wonderMove/models/index.ts'
import prismaHrm from '../hrm/models/index.ts'

const cleanData = async () => {
    await prisma.$executeRaw`truncate customers cascade`
    await prisma.$executeRaw`truncate vehicles cascade`
    await prisma.$executeRaw`truncate stops cascade`
    await prisma.$executeRaw`truncate "stopReasons" cascade`
    await prisma.$executeRaw`truncate "gpsStops" cascade`
    await prismaHrm.$executeRaw`truncate leaves cascade`
    await prismaHrm.$executeRaw`truncate employees cascade`
    await prismaHrm.$executeRaw`truncate "orgUnits" cascade`
    await prismaHrm.$executeRaw`truncate "orgUnitHeads" cascade`
    await prismaHrm.$executeRaw`truncate "leaveReasons" cascade`
}

export default cleanData
