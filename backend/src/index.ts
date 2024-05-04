import express from 'express'
import vehicleRoutes from './wonderMove/routes/vehicle.ts'
import stopRoutes from './wonderMove/routes/stops.ts'
import reasonRoutes from './wonderMove/routes/reason.ts'
import jobsRoutes from './wonderMove/routes/jobs.ts'
import leaveReasonRoutes from './hrm/routes/leaveReasons.ts'
import employeeLeavesRoutes from './hrm/routes/leaves.ts'
import orgHeadRoutes from './hrm/routes/orgHeads.ts'
import orgUnitHeads from './hrm/routes/orgUnits.ts'
import truckRoutes from './subContracts/routes/truck.ts'
import transporterRoutes from './subContracts/routes/transporter.ts'
import tripRoutes from './subContracts/routes/loadingToUnloadingTrip.ts'
import stockTripRoutes from './subContracts/routes/loadingToStockPointTrip.ts'
import unloadingTripRoutes from './subContracts/routes/stockPointToUnloadingPoint.ts'
import acknowledgementRoutes from './subContracts/routes/acknowledgements.ts'
import employeeRoutes from './hrm/routes/employees.ts'
import cementCompanyRoutes from './subContracts/routes/cementCompany.ts'
import factoryRoutes from './subContracts/routes/loadingPoint.ts'
import stockRoutes from './subContracts/routes/stockPoint.ts'
import deliveryPointRoutes from './subContracts/routes/unloadingPoint.ts'
import pricePointRoutes from './subContracts/routes/pricePoint.ts'
import paymentDues from './subContracts/routes/paymentDues.ts'
import bunkRoutes from './subContracts/routes/bunk.ts'
import fuelRoutes from './subContracts/routes/fuel.ts'
import pointMarkerRoutes from './subContracts/routes/pricePointMarker.ts'
import overallTrip from './subContracts/routes/overallTrip.ts'
import accountTypeRoutes from './subContracts/routes/accountType.ts'
import invoiceRoutes from './subContracts/routes/invoice.ts'
import billNumber from './subContracts/routes/billNumber.ts'
import driverRoutes from './driverSalary/routes/driver.ts'
import driverTripRoutes from './driverSalary/routes/driverTrip.ts'
import expenseRoutes from './driverSalary/routes/expense.ts'
import tripBettaRoutes from './driverSalary/routes/tripBetta.ts'

// import gpsStopRoutes from './gpsStops'

const router = express.Router()
// wondermove
vehicleRoutes(router)
stopRoutes(router)
reasonRoutes(router)
jobsRoutes(router)

// peopleOrg
leaveReasonRoutes(router)
employeeLeavesRoutes(router)
orgHeadRoutes(router)
orgUnitHeads(router)
employeeRoutes(router)

// subContrcat
truckRoutes(router)
transporterRoutes(router)
tripRoutes(router)
stockTripRoutes(router)
unloadingTripRoutes(router)
acknowledgementRoutes(router)
factoryRoutes(router)
stockRoutes(router)
cementCompanyRoutes(router)
deliveryPointRoutes(router)
pricePointRoutes(router)
overallTrip(router)
paymentDues(router)
bunkRoutes(router)
fuelRoutes(router)
pointMarkerRoutes(router)
accountTypeRoutes(router)
invoiceRoutes(router)
billNumber(router)

// driverSalary
driverRoutes(router)
driverTripRoutes(router)
expenseRoutes(router)
tripBettaRoutes(router)

export default router
