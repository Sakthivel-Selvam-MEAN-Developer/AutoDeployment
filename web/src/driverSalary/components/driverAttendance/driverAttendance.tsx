import React, { ReactElement, useEffect, useState } from 'react'
import { getFilteredDriverDetails } from '../../services/driver'
import DailyAttendaneTable from './table'
import { Button, Typography } from '@mui/material'
import { markDriverDailyAttendance } from '../../services/driverAttendance'
import { Link } from 'react-router-dom'

const style = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
}
const DriverDailyAttendance: React.FC = (): ReactElement => {
    const [driverList, setDriverList] = useState([])
    const [driverId, setDriverId] = useState<number[]>([])
    useEffect(() => {
        getFilteredDriverDetails().then(setDriverList)
    }, [])
    const handleClick = async () => {
        await markDriverDailyAttendance(driverId).then(async () => {
            setDriverId([])
            await getFilteredDriverDetails().then(setDriverList)
        })
    }
    return (
        <>
            <div style={style}>
                <Typography sx={{ fontWeight: 700 }}>Driver Daily Attendance</Typography>
                <AddBulkAttendanceButton />
            </div>
            {driverList.length === 0 ? (
                <p>
                    No Driver<small>(s)</small> to Add Attendance for Today ..!
                </p>
            ) : (
                <>
                    <DailyAttendaneTable
                        driverList={driverList}
                        setDriverId={setDriverId}
                        driverId={driverId}
                    />
                    <Button variant="contained" sx={{ marginTop: '20px' }} onClick={handleClick}>
                        Add Attendance
                    </Button>
                </>
            )}
        </>
    )
}
export default DriverDailyAttendance
const AddBulkAttendanceButton = () => {
    return (
        <Link to={'/driverSalary/attendance/bulk-attendance'}>
            <Button variant="contained">Add Bulk Attendance</Button>
        </Link>
    )
}
