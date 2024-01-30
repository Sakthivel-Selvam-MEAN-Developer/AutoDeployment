import prisma from '../../../prisma/index.ts'

const cleanData = async () => {
    await prisma.$executeRaw`truncate "subContract"."cementCompany" cascade`
    await prisma.$executeRaw`truncate "subContract"."truck" cascade`
    await prisma.$executeRaw`truncate "subContract"."transporter" cascade`
    await prisma.$executeRaw`truncate "subContract"."loadingPoint" cascade`
    await prisma.$executeRaw`truncate "subContract"."unloadingPoint" cascade`
    await prisma.$executeRaw`truncate "subContract"."paymentDues" cascade`
    await prisma.$executeRaw`truncate "subContract"."bunk" cascade`
    await prisma.$executeRaw`truncate "subContract"."fuelStation" cascade`
    await prisma.$executeRaw`truncate "subContract"."overallTrip" cascade`
    await prisma.$executeRaw`truncate "subContract"."transporter" cascade`
    await prisma.$disconnect()
}

export default cleanData
