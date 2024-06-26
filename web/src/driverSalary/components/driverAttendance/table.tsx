import { TableContainer, Paper, Table, TableRow, TableCell, Checkbox } from '@mui/material'
import { FC } from 'react'
import { tableProp, tableProps } from './type'
import { DailyAttendaneTableBody, DailyAttendaneTableHead } from './tableUtils'

export const DriverListRow: FC<tableProp> = ({ driver, setDriverId, driverId }) => {
    return (
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell align="center">
                <Checkbox
                    onClick={() => {
                        if (driverId.includes(driver.id))
                            setDriverId((prev) => prev.filter((id) => id !== driver.id))
                        else setDriverId([...driverId, driver.id])
                    }}
                />
            </TableCell>
            <TableCell align="center">{driver.name}</TableCell>
            <TableCell align="center">{driver.mobileNumber}</TableCell>
        </TableRow>
    )
}

const DailyAttendaneTable: FC<tableProps> = ({ driverList, setDriverId, driverId }) => {
    return (
        <TableContainer component={Paper} sx={{ maxWidth: 650 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <DailyAttendaneTableHead />
                <DailyAttendaneTableBody
                    driverList={driverList}
                    setDriverId={setDriverId}
                    driverId={driverId}
                />
            </Table>
        </TableContainer>
    )
}
export default DailyAttendaneTable
