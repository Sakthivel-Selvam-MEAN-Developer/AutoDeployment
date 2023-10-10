import { createBrowserRouter } from 'react-router-dom'
import Layout from './components/layout'
import Dashboard from './components/dashboard'
import DashboardList from './components/dashboard/list.tsx'
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
        ],
    }
])