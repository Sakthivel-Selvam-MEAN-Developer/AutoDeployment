import DriverSalaryDashboard from './driverSalary/components/dashboard'
import DriverSalaryDashboardList from './driverSalary/components/dashboard/list'
import Driver from './driverSalary/components/driver'
import CreateDriver from './driverSalary/components/driver/list'
import DriverSalaryLayout from './driverSalary/components/layout'

const driverSalaryRoutes = {
    path: '/driverSalary',
    element: <DriverSalaryLayout />,
    children: [
        {
            path: '',
            element: <DriverSalaryDashboard />,
            children: [
                {
                    path: '',
                    element: <DriverSalaryDashboardList />
                }
            ]
        },
        {
            path: 'driver',
            element: <Driver />,
            children: [
                {
                    path: '',
                    element: <CreateDriver />
                }
            ]
        }
    ]
}
export default driverSalaryRoutes
