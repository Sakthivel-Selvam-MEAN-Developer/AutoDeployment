import { create as createLoadingPoint } from '../subContracts/models/loadingPoint.ts'
import seedFactoryWithoutDep from '../subContracts/seed/loadingPointWithoutDep.ts'
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
import { create as createPricePointMarker } from '../subContracts/models/pricePointMarker.ts'
import seedLoadingToUnloadingTrip from '../subContracts/seed/loadingToUnloadingTrip.ts'
import { create } from '../subContracts/models/paymentDues.ts'
import { create as createCementCompany } from '../subContracts/models/cementCompany.ts'
import seedPaymentDue from '../subContracts/seed/paymentDue.ts'
import seedCementCompany from '../subContracts/seed/cementCompany.ts'
import seedPricePointMarker from '../subContracts/seed/pricePointMarker.ts'
import prisma from '../../prisma/index.ts'

async function addFuelStations() {
    await prisma.$executeRaw`INSERT INTO "subContract"."bunk" ("bunkName", "createdAt", "updatedAt")
    VALUES ('Barath Petroleum', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);`
    await prisma.$executeRaw`INSERT INTO "subContract"."truck" ("vehicleNumber", "capacity","transporterId","createdAt", "updatedAt")
    VALUES ('TN22E3456',50,2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);`
    await prisma.$executeRaw`INSERT INTO "subContract"."truck" ("vehicleNumber", "capacity","transporterId","createdAt", "updatedAt")
    VALUES ('TN12R9456',50,2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);`
    await prisma.$executeRaw`INSERT INTO "subContract"."fuelStation" ("location", "createdAt", "updatedAt", "bunkId")
    VALUES ('Chennai', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);`
    await prisma.$executeRaw`INSERT INTO "subContract"."fuelStation" ("location", "createdAt", "updatedAt", "bunkId")
    VALUES ('Pondicherry', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);`
    await prisma.$executeRaw`INSERT INTO "subContract"."stockPoint" ("name", "createdAt", "updatedAt","cementCompanyId","pricePointMarkerId")
    VALUES ('StockPoint', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1);`
    await prisma.$executeRaw`INSERT INTO "subContract"."overallTrip" ("loadingPointToUnloadingPointTripId", "createdAt", "updatedAt")
    VALUES (1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);`
}

async function seedSubContract() {
    const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
    const unloadingPricePointMarker = await createPricePointMarker({
        ...seedPricePointMarker,
        location: 'salem'
    })
    const cementCompany = await createCementCompany(seedCementCompany)
    const loadingPoint = await createLoadingPoint({
        ...seedFactoryWithoutDep,
        cementCompanyId: cementCompany.id,
        pricePointMarkerId: loadingPricePointMarker.id
    })
    const unloadingPoint = await createUnloadingPoint({
        ...seedDeliveryPointWithoutDep,
        cementCompanyId: cementCompany.id,
        pricePointMarkerId: unloadingPricePointMarker.id
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

    await addFuelStations()
}
export default seedSubContract
