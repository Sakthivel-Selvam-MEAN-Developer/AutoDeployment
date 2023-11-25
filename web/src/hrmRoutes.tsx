import HrmLayout from './hrm/components/layout'
import HrmDashboard from './hrm/components/dashboard'
import HrmDashboardList from './hrm/components/dashboard/list.tsx'
import Approvals from './hrm/components/approvals'
import ApprovalList from './hrm/components/approvals/list.tsx'
import Leaves from './hrm/components/leaves'
import LeaveList from './hrm/components/leaves/list.tsx'
import LeaveForm from './hrm/components/leaves/applyLeave.tsx'

const hrmRoutes = {
    path: '/hrm',
    element: <HrmLayout />,
    children: [
        {
            path: '',
            element: <HrmDashboard />,
            children: [
                {
                    path: '',
                    element: <HrmDashboardList />
                }
            ]
        },
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
        }
    ]
}
export default hrmRoutes
