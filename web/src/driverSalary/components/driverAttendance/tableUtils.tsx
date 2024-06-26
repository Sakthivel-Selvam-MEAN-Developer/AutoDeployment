import { DriverListRow } from './table'
import { TableHead, TableBody, TableRow, TableCell } from '@mui/material'
import { tableProps } from './type'
import { FC } from 'react'
export const DailyAttendaneTableHead = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell align="center">#</TableCell>
                <TableCell align="center">Driver Name</TableCell>
                <TableCell align="center">Phone Number</TableCell>
            </TableRow>
        </TableHead>
    )
}

export const DailyAttendaneTableBody: FC<tableProps> = ({ driverList, setDriverId, driverId }) => {
    return (
        <TableBody>
            {driverList.map((driver) => (
                <DriverListRow
                    key={driver.id}
                    driver={driver}
                    setDriverId={setDriverId}
                    driverId={driverId}
                />
            ))}
        </TableBody>
    )
}
