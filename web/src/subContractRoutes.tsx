import CementCompany from './subContracts/components/cementCompany'
import SubContractDashboard from './subContracts/components/dashboard'
import SubContractDashboardList from './subContracts/components/dashboard/list'
import SubContractLayout from './subContracts/components/layout'
import Trip from './subContracts/components/trip'
import TripList from './subContracts/components/trip/list'
import NewTrip from './subContracts/components/trip/newTrip'
import CreateCompany from './subContracts/components/cementCompany/company'
import CreateFactory from './subContracts/components/cementCompany/factory'

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
        }
    ]
}
export default sunContractRoutes
