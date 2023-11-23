import { PrismaClient } from '@prisma/client'
import seedOrgUnit from '../orgUnitRelation.ts'
import seedEmployeeHead from '../employeeHead.ts'
import seedEmployee from '../employeeWithoutDep.ts'
import seedReason from '../reason.ts'
import { create as createOrgUnit } from '../../models/orgUnitRelations.ts'
import { create as createEmployee } from '../../models/employee.ts'
import { create as createOrgUnitHead } from '../../models/orgUnitHeads.ts'
import { create as createReason } from '../../models/leaveReasons.ts'

const prisma = new PrismaClient()
const main = async () => {
    const orgUnit = await createOrgUnit(seedOrgUnit)
    const employeeHead = await createEmployee({
        ...seedEmployeeHead,
        orgUnitId: orgUnit.childOrgId
    })
    await createEmployee({ ...seedEmployee, orgUnitId: orgUnit.childOrgId })
    await createOrgUnitHead({
        orgUnitId: orgUnit.childOrgId,
        employeeId: employeeHead.id
    })
    await createReason(seedReason)
    await createReason({ name: 'Sick Leave' })
}
main()
    .then(() => prisma.$disconnect())
    .catch(async () => {
        await prisma.$disconnect()
        process.exit(1)
    })
