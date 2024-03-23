import DriverSalaryDashboard from './driverSalary/components/dashboard'
import DriverSalaryDashboardList from './driverSalary/components/dashboard/list'
import Driver from './driverSalary/components/driver'
import DriverSalary from './driverSalary/components/driverSalaryMaster'
import CreateDriver from './driverSalary/components/driver/list'
import DriverSalaryLayout from './driverSalary/components/layout'
import Driver_Salary from './driverSalary/components/driverSalaryMaster/main'

const driverSalaryRoutes = {
    path: '/driversalary',
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
        },
        {
            path: 'driver-salary',
            element: <DriverSalary />,
            children: [
                {
                    path: '',
                    element: <Driver_Salary />
                }
            ]
        }
    ]
}
export default driverSalaryRoutes
