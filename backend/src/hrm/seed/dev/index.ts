import { PrismaClient } from '@prisma/client'
import seedOrgUnitRelations from '../orgUnitRelation.ts'
import { create } from '../../models/orgUnitRelations.ts'

const prisma = new PrismaClient()
const main = () => create(seedOrgUnitRelations)
main()
    .then(() => prisma.$disconnect())
    .catch(async () => {
        await prisma.$disconnect()
        process.exit(1)
    })
