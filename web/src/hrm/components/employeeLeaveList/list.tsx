import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { epochToDate } from "../../../wonderMove/components/epochToTime";
import { getAllLeaveWithStatus } from "../../services/employeeLeave";


const EmployeeList: React.FC = () => {
    const [allLeave, setAllLeave] = useState([])

    useEffect(() => {
        // @ts-ignore
        getAllLeaveWithStatus().then(setAllLeave)
    }, [])

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Applied On</TableCell>
                            <TableCell align="left">From</TableCell>
                            <TableCell align="left">To</TableCell>
                            <TableCell align="left">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allLeave.map((row: any, index: number) => (
                            <TableRow
                                key={row.id}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell> {index + 1} </TableCell>
                                <TableCell align="left">
                                    {row.appliedBy}
                                </TableCell>
                                <TableCell align="left">
                                    {epochToDate(row.appliedOn)}
                                </TableCell>
                                <TableCell align="left">
                                    {epochToDate(row.from)}
                                </TableCell>
                                <TableCell align="left">
                                    {epochToDate(row.to)}
                                </TableCell>
                                <TableCell align="left">
                                    {row.approval === true
                                        ? "Approved"
                                        : row.approval === false
                                            ? "Rejected"
                                            : "Pending"}
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};
export default EmployeeList;