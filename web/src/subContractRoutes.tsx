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
import TransporterPay from './subContracts/components/trip/transporterPay'
import PaymentDues from './subContracts/components/paymentDues'
import PaymentDuesList from './subContracts/components/paymentDues/list'

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
                },
                {
                    path: 'pay',
                    element: <TransporterPay />
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
        }
    ]
}
export default sunContractRoutes
