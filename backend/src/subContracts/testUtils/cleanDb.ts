// import prisma from '../../../prisma/index.ts'

// const tableToClean = [
//     'cementCompany',
//     'truck',
//     'transporter',
//     'loadingPoint',
//     'unloadingPoint',
//     'paymentDues',
//     'bunk',
//     'shortageQuantity',
//     'overallTrip',
//     'transporter',
//     'accountType',
//     'billNo'
// ]
// const cleanTableData = async (table: string) =>
//     prisma.$executeRawUnsafe(`truncate "subContract"."${table}" cascade`)

// const cleanData = async () =>
//     Promise.all(tableToClean.map(cleanTableData)).then(() => prisma.$disconnect())

// export default cleanData

import prisma from '../../../prisma/index.ts'

const cleanData = async () => {
    await prisma.$executeRaw`truncate "subContract"."cementCompany" cascade`
    await prisma.$executeRaw`truncate "subContract"."truck" cascade`
    await prisma.$executeRaw`truncate "subContract"."transporter" cascade`
    await prisma.$executeRaw`truncate "subContract"."loadingPoint" cascade`
    await prisma.$executeRaw`truncate "subContract"."unloadingPoint" cascade`
    await prisma.$executeRaw`truncate "subContract"."paymentDues" cascade`
    await prisma.$executeRaw`truncate "subContract"."bunk" cascade`
    await prisma.$executeRaw`truncate "subContract"."shortageQuantity" cascade`
    await prisma.$executeRaw`truncate "subContract"."overallTrip" cascade`
    await prisma.$executeRaw`truncate "subContract"."transporter" cascade`
    await prisma.$executeRaw`truncate "subContract"."accountType" cascade`
    await prisma.$executeRaw`truncate "subContract"."billNo" cascade`
    await prisma.$disconnect()
}

export default cleanData
