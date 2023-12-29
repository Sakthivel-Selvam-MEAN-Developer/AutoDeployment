import { create as createLoadingPoint } from '../subContracts/models/loadingPoint.ts'
import seedFactory from '../subContracts/seed/loadingPoint.ts'
import { create as createUnloadingPoint } from '../subContracts/models/unloadingPoint.ts'
import seedDeliveryPointWithoutDep from '../subContracts/seed/unloadingPointWithoutDep.ts'
import { create as createTruck } from '../subContracts/models/truck.ts'
import seedTruck from '../subContracts/seed/truck.ts'
import seedTruckWithoutDep from '../subContracts/seed/truckWithoutDeb.ts'
import { create as createBank } from '../subContracts/models/bankDetails.ts'
import seedBank from '../subContracts/seed/bankDetails.ts'
import { create as createTransporter } from '../subContracts/models/transporter.ts'
import seedTransporterWithoutDep from '../subContracts/seed/transporterWithoutDep.ts'
import { create as createPricePoint } from '../subContracts/models/pricePoint.ts'
import seedPricePoint from '../subContracts/seed/pricePoint.ts'
import { create as createTrip } from '../subContracts/models/loadingToUnloadingTrip.ts'
import seedLoadingToUnloadingTrip from '../subContracts/seed/loadingToUnloadingTrip.ts'
import { create } from '../subContracts/models/paymentDues.ts'
import seedPaymentDue from '../subContracts/seed/paymentDue.ts'
import prisma from '../../prisma/index.ts'

async function seedSubContract() {
    const loadingPoint = await createLoadingPoint(seedFactory)
    const unloadingPoint = await createUnloadingPoint({
        ...seedDeliveryPointWithoutDep,
        cementCompanyId: loadingPoint.cementCompanyId
    })
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
    await createPricePoint({
        ...seedPricePoint,
        loadingPointId: loadingPoint.id,
        unloadingPointId: unloadingPoint.id
    })
    const trip = await createTrip({
        ...seedLoadingToUnloadingTrip,
        loadingPointId: loadingPoint.id,
        unloadingPointId: unloadingPoint.id,
        truckId: truck.id
    })
    await create({ ...seedPaymentDue, tripId: trip.id })

    await prisma.$executeRaw`INSERT INTO "subContract"."bunk" ("bunkName", "createdAt", "updatedAt")
    VALUES ('Barath Petroleum', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);`
    await prisma.$executeRaw`INSERT INTO "subContract"."fuelStation" ("location", "createdAt", "updatedAt", "bunkId")
    VALUES ('Chennai', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);`
    await prisma.$executeRaw`INSERT INTO "subContract"."fuelStation" ("location", "createdAt", "updatedAt", "bunkId")
    VALUES ('Pondicherry', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);`
}
export default seedSubContract
