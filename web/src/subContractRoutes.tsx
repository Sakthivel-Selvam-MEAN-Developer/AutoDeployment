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
        }
    ]
}
export default sunContractRoutes
