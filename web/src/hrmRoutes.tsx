import HrmLayout from './peopleOrg/components/layout'
import HrmDashboard from './peopleOrg/components/dashboard'
import HrmDashboardList from './peopleOrg/components/dashboard/list.tsx'
import Approvals from './peopleOrg/components/approvals'
import ApprovalList from './peopleOrg/components/approvals/list.tsx'
import Leaves from './peopleOrg/components/leaves'
import LeaveList from './peopleOrg/components/leaves/list.tsx'
import LeaveForm from './peopleOrg/components/leaves/applyLeave.tsx'

const hrmRoutes = {
    path: '/hrm',
    element: <HrmLayout />,
    children: [
        {
            path: 'approval',
            element: <Approvals />,
            children: [
                {
                    path: '',
                    element: <ApprovalList />
                }
            ]
        },
        {
            path: 'leaves',
            element: <Leaves />,
            children: [
                {
                    path: '',
                    element: <LeaveList />
                },
                {
                    path: 'apply',
                    element: <LeaveForm />
                }
            ]
        },
        {
            path: 'dashboard/:employeeId',
            element: <HrmDashboard />,
            children: [
                {
                    path: '',
                    element: <HrmDashboardList />
                }
            ]
        }
    ]
}
export default hrmRoutes
