import { PrismaClient } from '@prisma/client'
import seedOrgUnit from '../hrm/seed/orgUnitRelation.ts'
import seedEmployeeHead from '../hrm/seed/employeeHead.ts'
import seedEmployee from '../hrm/seed/employeeWithoutDep.ts'
import seedReason from '../hrm/seed/reason.ts'
import seedTruck from '../subContracts/seed/truck.ts'
import { create as createOrgUnit } from '../hrm/models/orgUnitRelations.ts'
import { create as createEmployee } from '../hrm/models/employee.ts'
import { create as createOrgUnitHead } from '../hrm/models/orgUnitHeads.ts'
import { create as createReason } from '../hrm/models/leaveReasons.ts'
import { create as createTruck } from '../subContracts/models/truck.ts'

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

    //   Seed Truck
    await createTruck(seedTruck)
    await createTruck({ ...seedTruck, vehicleNumber: 'TN33AB2312', capacity: 60 })
}
main()
    .then(() => prisma.$disconnect())
    .catch(async () => {
        await prisma.$disconnect()
        process.exit(1)
    })
