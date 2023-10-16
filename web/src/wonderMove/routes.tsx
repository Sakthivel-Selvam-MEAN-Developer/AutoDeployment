import { createBrowserRouter } from 'react-router-dom'
import Layout from './components/layout'
import Dashboard from './components/dashboard'
import DashboardList from './components/dashboard/list.tsx'
import VehiclesHome from './components/vehicles/home.tsx'
import VehicleList from './components/vehicles/list.tsx'
import {NewVehicle} from './components/vehicles/new.tsx'
import CustomersHome from './components/customers/home.tsx'
import CustomerList from './components/customers/list.tsx'
import {NewCustomer} from './components/customers/new.tsx'
import StopsHome from "./components/stops/home.tsx";
import StopList from "./components/stops/list.tsx";
import PendingReasonHome from "./components/pendingReason/home.tsx";
import PendingList from "./components/pendingReason/list.tsx";
import Details from './components/pendingReason/view.tsx'
import Reason from "./components/reason/home.tsx";
import ReasonList from "./components/reason/list.tsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: '',
                element: <Dashboard/>,
                children: [
                    {
                        path: '',
                        element: <DashboardList/>,
                    },
                ],
            },
            {
                path: 'reason',
                element: <Reason/>,
                children: [
                    {
                        path: '',
                        element: <ReasonList/>,
                    },
                ],
            },
            {
                path: 'pending-reasons',
                element: <PendingReasonHome />,
                children: [
                    {
                        path: '',
                        element: <PendingList />,
                    },
                    {
                        path: 'details/:number',
                        element: <Details />,
                    },
                ],
            },
            {
                path: 'stops',
                element: <StopsHome />,
                children: [
                    {
                        path: '',
                        element: <StopList />,
                    },
                ],
            },
            {
                path: 'vehicles',
                element: <VehiclesHome />,
                children: [
                    {
                        path: '',
                        element: <VehicleList />,
                    },
                    {
                        path: 'create',
                        element: <NewVehicle />,
                    },
                ],
            },
            {
                path: 'customers',
                element: <CustomersHome />,
                children: [
                    {
                        path: '',
                        element: <CustomerList />,
                    },
                    {
                        path: 'create',
                        element: <NewCustomer />,
                    },
                ],
            },
        ],
    }
])