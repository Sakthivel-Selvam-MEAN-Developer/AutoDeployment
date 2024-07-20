import prisma from '../../../prisma/index.ts'

const cleanData = async () => {
    await prisma().$executeRaw`truncate "driverSalary"."driver" cascade`
    await prisma().$executeRaw`truncate "driverSalary"."expenses" cascade`
    await prisma().$executeRaw`truncate "driverSalary"."tripSalary" cascade`
    await prisma().$executeRaw`truncate "driverSalary"."driverAttendance" cascade`
    await prisma().$executeRaw`truncate "driverSalary"."driverAdvance" cascade`
    await prisma().$disconnect()
}

export default cleanData
