import { Link } from 'react-router-dom'
import { Button } from '@mui/material'

export const AddBulkAttendanceButton = () => {
    return (
        <Link to={'/driverSalary/attendance/bulk-attendance'}>
            <Button variant="contained">Add Bulk Attendance</Button>
        </Link>
    )
}
