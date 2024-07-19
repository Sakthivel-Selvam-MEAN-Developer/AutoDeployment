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
import BunkIndex from './subContracts/components/bunk'
import Acknowledgement from './subContracts/components/acknowledgement'
import SelectTrip from './subContracts/components/acknowledgement/list'
import Invoice from './subContracts/components/invoice/generateInvoice'
import InvoiceList from './subContracts/components/invoice/generateInvoice/list'
import Report from './subContracts/components/report'
import ViewList from './subContracts/components/invoice/viewInvoice/list'
import ListAllTrip from './subContracts/components/report/tripStatusReport/list'
import ListAllUpcomingDues from './subContracts/components/report/upcomingTransporterDuesReport/upcomingTransporterDuesList'
import ListAllAcknowledgementDues from './subContracts/components/report/acknowledgementAgingReport/listAllAcknowledgementDues'
import ListAllDiscrepancyReport from './subContracts/components/report/discrepancyPaymentReport/discrepancyReportList'
import Transporter from './subContracts/components/transporter'
import CreateTransporter from './subContracts/components/transporter/list'
import AddVehicle from './subContracts/components/transporter/addVehicle'
import CompletedPayment from './subContracts/components/report/completedPaymentDuesReport/completedPayment'
import AddAcknowledgement from './subContracts/components/acknowledgement/addAcknowledgement'
import TransporterInvoice from './subContracts/components/transporterInvoice'
import TransporterInvoiceList from './subContracts/components/transporterInvoice/list'
import AcknowledgementApprovalList from './subContracts/components/acknowledgementApproval/list'
import AcknowledgementApproval from './subContracts/components/acknowledgementApproval'
import TollPlaza from './subContracts/components/tollPlaza'
import ListTrips from './subContracts/components/tollPlaza/list'
import ListTripsForTollInvoice from './subContracts/components/tollPlaza/tollInvoice/listTripsForTollInvoice'
import PricePointApproval from './subContracts/components/pricePointApproval'
import PricePointApprovalList from './subContracts/components/pricePointApproval/list'
import Bunk from './subContracts/components/bunk/addBunk/list'
import Employee from './subContracts/components/employee'
import CreateEmployee from './subContracts/components/employee/list'
import CompanyAdvisoryIndex from './subContracts/components/companyAdvisory'
import CompanyAdvisory from './subContracts/components/companyAdvisory/list'
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
            element: <BunkIndex />,
            children: [
                {
                    path: '',
                    element: <Bunk />
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
                },
                {
                    path: 'addAcknowledgement',
                    element: <AddAcknowledgement />
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
            path: 'employee',
            element: <Employee />,
            children: [
                {
                    path: '',
                    element: <CreateEmployee />
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
                },
                {
                    path: 'viewinvoice',
                    element: <ViewList />
                }
            ]
        },
        {
            path: 'reports',
            element: <Report />,
            children: [
                {
                    path: 'listAllTrip',
                    element: <ListAllTrip />
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
                },
                {
                    path: 'completedpayment',
                    element: <CompletedPayment />
                },
                {
                    path: 'fuel',
                    element: <BunkList />
                }
            ]
        },
        {
            path: 'transporterinvoice',
            element: <TransporterInvoice />,
            children: [
                {
                    path: '',
                    element: <TransporterInvoiceList />
                }
            ]
        },
        {
            path: 'acknowledgementapproval',
            element: <AcknowledgementApproval />,
            children: [
                {
                    path: '',
                    element: <AcknowledgementApprovalList />
                }
            ]
        },
        {
            path: 'toll',
            element: <TollPlaza />,
            children: [
                {
                    path: '',
                    element: <ListTrips />
                },
                {
                    path: 'tollInvoice',
                    element: <ListTripsForTollInvoice />
                }
            ]
        },
        {
            path: 'pricepointapproval',
            element: <PricePointApproval />,
            children: [
                {
                    path: '',
                    element: <PricePointApprovalList />
                }
            ]
        },
        {
            path: 'companyAdvisory',
            element: <CompanyAdvisoryIndex />,
            children: [
                {
                    path: '',
                    element: <CompanyAdvisory />
                }
            ]
        }
    ]
}
export default sunContractRoutes
