import { createBrowserRouter } from 'react-router-dom'
import Layout from './components/layout'
export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        // children: [
            // {
            //     path: '',
                // element: <Dashboard/>,
                // children: [
                    // {
                    //     path: '',
                    //     element: <DashboardList/>,
                    // },
                // ],
            // },
        // ],
    }
])