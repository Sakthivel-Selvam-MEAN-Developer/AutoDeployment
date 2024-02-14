import CementCompany from './subContracts/components/cementCompany'
import SubContractDashboard from './subContracts/components/dashboard'
import SubContractDashboardList from './subContracts/components/dashboard/list'
import SubContractLayout from './subContracts/components/layout'
import Trip from './subContracts/components/trip'
import TripList from './subContracts/components/trip/list'
import NewTrip from './subContracts/components/trip/newTrip'
import CreateCompany from './subContracts/components/cementCompany/company'
import CreateFactory from './subContracts/components/cementCompany/factory'
import PricePoint from './subContracts/components/pricePoint'
import CreatePricepoint from './subContracts/components/pricePoint/list'
import PaymentDues from './subContracts/components/paymentDues'
import PaymentDuesList from './subContracts/components/paymentDues/list'
import Fuel from './subContracts/components/bunk/fuel'
import BunkList from './subContracts/components/bunk/list'
import Bunk from './subContracts/components/bunk'
import Acknowledgement from './subContracts/components/acknowledgement'
import SelectTrip from './subContracts/components/acknowledgement/list'
import Transporter from './subContracts/components/transporter'
import CreateTransporter from './subContracts/components/transporter/list'
import AddVehicle from './subContracts/components/transporter/addVehicle'
import Invoice from './subContracts/components/invoice'
import InvoiceList from './subContracts/components/invoice/list'
import Report from './subContracts/components/report'
import ListAllReport from './subContracts/components/report/list'
import ListAllUpcomingDues from './subContracts/components/report/upcomingTransporterDuesList'
import ListAllAcknowledgementDues from './subContracts/components/report/acknowledgementAgingReport/upcomingTransporterDuesList'
import ListAllDiscrepancyReport from './subContracts/components/report/discrepancyPaymentReport/discrepancyReportList'

const sunContractRoutes = {
    path: '/sub',
    element: <SubContractLayout />,
    children: [
        {
            path: '',
            element: <SubContractDashboard />,
            children: [
                {
                    path: '',
                    element: <SubContractDashboardList />
                }
            ]
        },
        {
            path: 'trip',
            element: <Trip />,
            children: [
                {
                    path: '',
                    element: <TripList />
                },
                {
                    path: 'add',
                    element: <NewTrip />
                }
            ]
        },
        {
            path: 'company',
            element: <CementCompany />,
            children: [
                {
                    path: '',
                    element: <CreateCompany />
                },
                {
                    path: 'factory',
                    element: <CreateFactory />
                }
            ]
        },
        {
            path: 'price-point',
            element: <PricePoint />,
            children: [
                {
                    path: '',
                    element: <CreatePricepoint />
                }
            ]
        },
        {
            path: 'payment-dues',
            element: <PaymentDues />,
            children: [
                {
                    path: '',
                    element: <PaymentDuesList />
                }
            ]
        },
        {
            path: 'bunk',
            element: <Bunk />,
            children: [
                {
                    path: '',
                    element: <BunkList />
                },
                {
                    path: 'fuel',
                    element: <Fuel />
                }
            ]
        },
        {
            path: 'acknowledgement',
            element: <Acknowledgement />,
            children: [
                {
                    path: '',
                    element: <SelectTrip />
                }
            ]
        },
        {
            path: 'transporter',
            element: <Transporter />,
            children: [
                {
                    path: '',
                    element: <CreateTransporter />
                },
                {
                    path: 'addvehicle',
                    element: <AddVehicle />
                }
            ]
        },
        {
            path: 'invoice',
            element: <Invoice />,
            children: [
                {
                    path: '',
                    element: <InvoiceList />
                }
            ]
        },
        {
            path: 'reports',
            element: <Report />,
            children: [
                {
                    path: '',
                    element: <ListAllReport />
                },
                {
                    path: 'upcomingdues',
                    element: <ListAllUpcomingDues />
                },
                {
                    path: 'pendingacknowledgement',
                    element: <ListAllAcknowledgementDues />
                },
                {
                    path: 'discrepancydues',
                    element: <ListAllDiscrepancyReport />
                }
            ]
        }
    ]
}
export default sunContractRoutes
