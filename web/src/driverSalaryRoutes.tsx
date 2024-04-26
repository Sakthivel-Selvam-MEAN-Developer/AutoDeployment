import DriverSalaryDashboard from './driverSalary/components/dashboard'
import DriverSalaryDashboardList from './driverSalary/components/dashboard/list'
import Driver from './driverSalary/components/driver'
import DriverSalary from './driverSalary/components/driverSalaryMaster'
import CreateDriver from './driverSalary/components/driver/list'
import DriverSalaryLayout from './driverSalary/components/layout'
import ListExpenses from './driverSalary/components/driverSalaryMaster/addExpenses'
import DriverSalaryConatiner from './driverSalary/components/driverSalaryMaster/driverDetails'
import ExpenseApprovalList from './driverSalary/components/expenseApproval/expenseApproval'
import ExpenseApproval from './driverSalary/components/expenseApproval'

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
            path: 'employee-salary',
            element: <DriverSalary />,
            children: [
                {
                    path: '',
                    element: <DriverSalaryConatiner />
                },
                {
                    path: 'addexpenses',
                    element: <ListExpenses />
                }
            ]
        },
        {
            path: 'expenseapproval',
            element: <ExpenseApproval />,
            children: [
                {
                    path: '',
                    element: <ExpenseApprovalList />
                }
            ]
        }
    ]
}
export default driverSalaryRoutes
