import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button
} from '@mui/material'
import { FC } from 'react'
import DownloadIcon from '@mui/icons-material/Download'
import { driverDialogProps } from './downloadAllDetailsDialog'

const Driver_Table: FC<driverDialogProps> = ({ setActivateDialog }) => {
    return (
        <TableContainer component={Paper} sx={{ marginTop: '30px' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">S.No</TableCell>
                        <TableCell align="center">Date</TableCell>
                        <TableCell align="center">From - To</TableCell>
                        <TableCell align="center">Invoice Number</TableCell>
                        <TableCell align="center">Expenses Amount</TableCell>
                        <TableCell align="center">Trip Betta</TableCell>
                        <TableCell align="center">Advance Amount</TableCell>
                        <TableCell align="center">Trip Salary</TableCell>
                        <TableCell align="center">Download</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell align="center">1</TableCell>
                        <TableCell align="center">21/03/2024</TableCell>
                        <TableCell align="center">Chennai - Salem</TableCell>
                        <TableCell align="center">ABC12345</TableCell>
                        <TableCell align="center">{'\u20B9'} 2349</TableCell>
                        <TableCell align="center">{'\u20B9'} 6490</TableCell>
                        <TableCell align="center">{'\u20B9'} 5460</TableCell>
                        <TableCell align="center">{'\u20B9'} 13456</TableCell>
                        <TableCell align="center">
                            {
                                <Button onClick={() => setActivateDialog(true)}>
                                    <DownloadIcon />
                                </Button>
                            }
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Driver_Table
