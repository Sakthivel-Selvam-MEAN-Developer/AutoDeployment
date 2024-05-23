import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Checkbox
} from '@mui/material'
import { FC } from 'react'
import { tableProps } from './type'

const DailyAttendaneTableHead = () => {
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

const DailyAttendaneTableBody: FC<tableProps> = ({ driverList, setDriverId, driverId }) => {
    return (
        <TableBody>
            {driverList.map((driver) => (
                <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    key={driver.id}
                >
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
            ))}
        </TableBody>
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
