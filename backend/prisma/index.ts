import { PrismaClient } from '@prisma/client'
import { DriverAdapter } from '@prisma/client/runtime/library'
let testPrisma = new PrismaClient()
let isTestPrisma = false

const defaultPrisma = new PrismaClient()


const prisma = () => isTestPrisma ? testPrisma : defaultPrisma


export const initPrisma = (adapter: DriverAdapter) => {
    testPrisma = new PrismaClient({ adapter })
    isTestPrisma = true
}
export default prisma
