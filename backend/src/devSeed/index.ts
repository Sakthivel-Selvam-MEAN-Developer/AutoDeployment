import { PrismaClient } from '@prisma/client'
import seedOrgUnit from '../hrm/seed/orgUnitRelation.ts'
import seedEmployeeHead from '../hrm/seed/employeeHead.ts'
import seedEmployee from '../hrm/seed/employeeWithoutDep.ts'
import seedReason from '../hrm/seed/reason.ts'
import seedTruck from '../subContracts/seed/truck.ts'
import seedTruckWithoutDep from '../subContracts/seed/truckWithoutDeb.ts'
import seedFactory from '../subContracts/seed/factory.ts'
import seedDeliveryPointWithoutDep from '../subContracts/seed/deliveryPointWithoutDep.ts'
import { create as createOrgUnit } from '../hrm/models/orgUnitRelations.ts'
import { create as createEmployee } from '../hrm/models/employee.ts'
import { create as createOrgUnitHead } from '../hrm/models/orgUnitHeads.ts'
import { create as createReason } from '../hrm/models/leaveReasons.ts'
import { create as createTruck } from '../subContracts/models/truck.ts'
import { create as createFactory } from '../subContracts/models/factory.ts'
import { create } from '../subContracts/models/deliveryPoint.ts'

const prisma = new PrismaClient()
const main = async () => {
    // const orgUnit = await createOrgUnit(seedOrgUnit)
    // const employeeHead = await createEmployee({
    //     ...seedEmployeeHead,
    //     orgUnitId: orgUnit.childOrgId
    // })
    // await createEmployee({ ...seedEmployee, orgUnitId: orgUnit.childOrgId })
    // await createOrgUnitHead({
    //     orgUnitId: orgUnit.childOrgId,
    //     employeeId: employeeHead.id
    // })
    // await createReason(seedReason)
    // await createReason({ name: 'Sick Leave' })

    //  Seed Factory
    const factory = await createFactory(seedFactory)
    await create({ ...seedDeliveryPointWithoutDep, cementCompanyId: factory.cementCompanyId })
    //  Seed Truck
    const truck = await createTruck(seedTruck)
    await createTruck({ ...seedTruckWithoutDep, transporterId: truck.transporterId })
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
