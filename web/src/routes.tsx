import MoveItLayout from './wonderMove/components/layout'
import Dashboard from './wonderMove/components/dashboard'
import DashboardList from './wonderMove/components/dashboard/list.tsx'
import VehiclesHome from './wonderMove/components/vehicles/home.tsx'
import VehicleList from './wonderMove/components/vehicles/list.tsx'
import { NewVehicle } from './wonderMove/components/vehicles/new.tsx'
import CustomersHome from './wonderMove/components/customers/home.tsx'
import CustomerList from './wonderMove/components/customers/list.tsx'
import { NewCustomer } from './wonderMove/components/customers/new.tsx'
import StopsHome from './wonderMove/components/stops/home.tsx'
import StopList from './wonderMove/components/stops/list.tsx'
import PendingReasonHome from './wonderMove/components/pendingReason/home.tsx'
import PendingList from './wonderMove/components/pendingReason/list.tsx'
import Details from './wonderMove/components/pendingReason/view.tsx'
import Reason from './wonderMove/components/reason/home.tsx'
import ReasonList from './wonderMove/components/reason/list.tsx'
import hrmRoutes from './hrmRoutes.tsx'
import sunContractRoutes from './subContractRoutes.tsx'

export const router = [
    {
        path: '/moveit',
        element: <MoveItLayout />,
        children: [
            {
                path: '',
                element: <Dashboard />,
                children: [
                    {
                        path: '',
                        element: <DashboardList />
                    }
                ]
            },
            {
                path: 'reason',
                element: <Reason />,
                children: [
                    {
                        path: '',
                        element: <ReasonList />
                    }
                ]
            },
            {
                path: 'pending-reasons',
                element: <PendingReasonHome />,
                children: [
                    {
                        path: '',
                        element: <PendingList />
                    },
                    {
                        path: 'details/:number',
                        element: <Details />
                    }
                ]
            },
            {
                path: 'stops',
                element: <StopsHome />,
                children: [
                    {
                        path: '',
                        element: <StopList />
                    }
                ]
            },
            {
                path: 'vehicles',
                element: <VehiclesHome />,
                children: [
                    {
                        path: '',
                        element: <VehicleList />
                    },
                    {
                        path: 'create',
                        element: <NewVehicle />
                    }
                ]
            },
            {
                path: 'customers',
                element: <CustomersHome />,
                children: [
                    {
                        path: '',
                        element: <CustomerList />
                    },
                    {
                        path: 'create',
                        element: <NewCustomer />
                    }
                ]
            }
        ]
    },
    hrmRoutes,
    sunContractRoutes
]
