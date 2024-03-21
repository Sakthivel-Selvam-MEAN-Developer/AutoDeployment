import { PrismaClient } from '@prisma/client'
import seedOrgUnit from '../hrm/seed/orgUnitRelation.ts'
import seedEmployeeHead from '../hrm/seed/employeeHead.ts'
import seedEmployee from '../hrm/seed/employeeWithoutDep.ts'
import seedReason from '../hrm/seed/reason.ts'
import { create as createOrgUnit } from '../hrm/models/orgUnitRelations.ts'
import { create as createEmployee } from '../hrm/models/employee.ts'
import { create as createOrgUnitHead } from '../hrm/models/orgUnitHeads.ts'
import { create as createReason } from '../hrm/models/leaveReasons.ts'
import seedSubContract from './subContract.ts'

const prisma = new PrismaClient()

const createOrgSetupWithEmployee = async () => {
    const orgUnit = await createOrgUnit(seedOrgUnit)
    const employeeHead = await createEmployee({
        ...seedEmployeeHead,
        orgUnitId: orgUnit.childOrgId
    })
    await createEmployee({ ...seedEmployee, orgUnitId: orgUnit.childOrgId })
    await createOrgUnitHead({ orgUnitId: orgUnit.childOrgId, employeeId: employeeHead.id })
}

const main = async () => {
    await createOrgSetupWithEmployee()
    await createReason(seedReason)
    await createReason({ name: 'Sick Leave' })
    await seedSubContract()
}
main()
    .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error)
        process.exit(1)
    })
    .finally(() => {
        prisma.$disconnect()
    })
