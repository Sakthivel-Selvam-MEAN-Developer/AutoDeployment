import prisma from '../../../prisma/index.ts'

const cleanData = async () => {
    await prisma().$executeRaw`truncate "peopleOrg"."leaves" cascade`
    await prisma().$executeRaw`truncate "peopleOrg"."orgUnits" cascade`
    await prisma().$executeRaw`truncate "peopleOrg"."employees" cascade`
    await prisma().$executeRaw`truncate "peopleOrg"."orgUnitHeads" cascade`
    await prisma().$executeRaw`truncate "peopleOrg"."leaveReasons" cascade`
    await prisma().$executeRaw`truncate "peopleOrg"."orgUnitRelations" cascade`
    await prisma().$disconnect()
}

export default cleanData
