import prisma from '../../../prisma/index.ts'

const tableToClean = [
    '"cementCompany"',
    '"truck"',
    '"transporter"',
    '"loadingPoint"',
    '"unloadingPoint"',
    '"paymentDues"',
    '"bunk"',
    '"shortageQuantity"',
    '"overallTrip"',
    '"transporter"',
    '"accountType"',
    '"billNo"',
    '"tollPlazaLocation"',
    '"tollPayment"',
    '"employee"',
    '"companyAdvisory"'
]
const cleanTableData = async (table: string) =>
    prisma.$executeRawUnsafe(`truncate "subContract".${table} cascade`)

const cleanData = async () =>
    Promise.all(tableToClean.map(cleanTableData)).then(() => prisma.$disconnect())

export default cleanData
