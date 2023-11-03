import prisma from '../index.ts'

const cleanData = async () => {
    await prisma.$executeRaw`truncate customers cascade`
    await prisma.$executeRaw`truncate vehicles cascade`
    await prisma.$executeRaw`truncate stops cascade`
    await prisma.$executeRaw`truncate "stopReasons" cascade`
    await prisma.$executeRaw`truncate "gpsStops" cascade`
}

export default cleanData
