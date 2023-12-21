import { PrismaClient } from '@prisma/client'
import seedOrgUnit from '../hrm/seed/orgUnitRelation.ts'
import seedEmployeeHead from '../hrm/seed/employeeHead.ts'
import seedEmployee from '../hrm/seed/employeeWithoutDep.ts'
import seedReason from '../hrm/seed/reason.ts'
import seedTruck from '../subContracts/seed/truck.ts'
import seedBank from '../subContracts/seed/bankDetails.ts'
import seedTruckWithoutDep from '../subContracts/seed/truckWithoutDeb.ts'
import seedTransporterWithoutDep from '../subContracts/seed/transporterWithoutDep.ts'
import seedFactory from '../subContracts/seed/loadingPoint.ts'
import seedDeliveryPointWithoutDep from '../subContracts/seed/unloadingPointWithoutDep.ts'
import { create as createOrgUnit } from '../hrm/models/orgUnitRelations.ts'
import { create as createEmployee } from '../hrm/models/employee.ts'
import { create as createOrgUnitHead } from '../hrm/models/orgUnitHeads.ts'
import { create as createReason } from '../hrm/models/leaveReasons.ts'
import { create as createTruck } from '../subContracts/models/truck.ts'
import { create as createFactory } from '../subContracts/models/loadingPoint.ts'
import { create } from '../subContracts/models/unloadingPoint.ts'
import { create as createBank } from '../subContracts/models/bankDetails.ts'
import { create as createTransporter } from '../subContracts/models/transporter.ts'

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

    //  Seed Sub-Contract
    const factory = await createFactory(seedFactory)
    await create({ ...seedDeliveryPointWithoutDep, cementCompanyId: factory.cementCompanyId })
    const truck = await createTruck(seedTruck)
    await createTruck({ ...seedTruckWithoutDep, transporterId: truck.transporterId })
    const bankDetails = await createBank({ ...seedBank, accountNumber: 9876930 })
    const transporter = await createTransporter({
        ...seedTransporterWithoutDep,
        bankDetailsId: bankDetails.id
    })
    await createTruck({
        ...seedTruckWithoutDep,
        vehicleNumber: 'TN30S4325',
        transporterId: transporter.id
    })
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
