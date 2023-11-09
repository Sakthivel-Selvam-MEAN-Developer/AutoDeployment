import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { approveLeaves, getAllLeaveForms, rejectLeaves } from "../../services/employeeLeave";
import { epochToDate } from "../../../wonderMove/components/epochToTime";
import { Button } from "@mui/material"

const ManagerFormList: React.FC = () => {
    const [allList, setAllList] = useState([])

    useEffect(() => {
        // @ts-ignore
        getAllLeaveForms().then(setAllList)
    }, [])
    const rejectClick = (row: any) => {
        rejectLeaves(row.id, { appliedBy: row.appliedBy })
    }
    const approveClick = (row: any) => {
        approveLeaves(row.id, { appliedBy: row.appliedBy })
    }


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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allList.map((row: any, index: number) => (
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
                                    <Button onClick={() => rejectClick(row)}> Reject</Button>
                                </TableCell>
                                <TableCell align="left">
                                    <Button onClick={() => approveClick(row)}> Approve</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};
export default ManagerFormList;