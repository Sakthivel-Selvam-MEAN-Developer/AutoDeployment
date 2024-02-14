import React, { FC, useEffect, useState } from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    TextField,
    Typography
} from '@mui/material'
import { approveLeaves, rejectLeaves } from '../../services/employeeLeave'
import { epochToMinimalDate } from '../../../commonUtils/epochToTime.ts'
import { Done, Close } from '@mui/icons-material'
import { getAllLeaveAfterApply } from '../../services/orgHead'
import { useAtomValue } from 'jotai/react'
import { userIdAtom } from '../layout/userAtom.tsx'

const ApprovalList: FC = () => {
    const [allList, setAllList] = useState([])
    const [selectedRow, setSelectedRow] = useState<any | null>(null)
    const [rejectRow, setRejectRow] = useState<any | null>(null)
    const [open, setOpen] = useState(false)
    const [rejectionReason, setRejectionReason] = useState('')
    const [refresh, setRefresh] = useState(false)
    const employeeId = useAtomValue(userIdAtom)

    useEffect(() => {
        getAllLeaveAfterApply(employeeId).then(setAllList)
    }, [refresh, employeeId])
    const rejectClick = (row: any) => {
        setRejectRow(row)
        setOpen(true)
    }
    interface props {
        id: number
        employeeId: string
    }
    const approveClick = (row: props) => {
        approveLeaves(row.id, { employeeId: row.employeeId }).then(() =>
            setRefresh((prevState) => !prevState)
        )
    }
    const handleListItemClick = (rowId: number) =>
        setSelectedRow(selectedRow === rowId ? null : rowId)
    const handleReject = (row: any) => {
        rejectLeaves(row.id, { employeeId: row.employeeId, deniedComment: rejectionReason })
            .then(() => setOpen(false))
            .then(() => setRejectionReason(''))
            .then(() => setRejectRow(null))
            .then(() => setRefresh((prevState) => !prevState))
    }

    return (
        <>
            <List>
                {allList &&
                    allList.map((row: any) => (
                        <React.Fragment key={row.id}>
                            <ListItem
                                key={row.id}
                                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                            >
                                <div onClick={() => handleListItemClick(row.id)}>
                                    <ListItemText
                                        primary={row.employee.name}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    Duration&nbsp;: &nbsp;
                                                </Typography>
                                                {epochToMinimalDate(row.from)} &nbsp;- &nbsp;
                                                {epochToMinimalDate(row.to)}
                                            </React.Fragment>
                                        }
                                    />
                                    {selectedRow == row.id && (
                                        <>
                                            <ListItemSecondaryAction>
                                                <IconButton
                                                    aria-label="deny"
                                                    onClick={() => rejectClick(row)}
                                                >
                                                    <Close />
                                                </IconButton>
                                                <IconButton
                                                    aria-label="approve"
                                                    onClick={() => approveClick(row)}
                                                >
                                                    <Done />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                            <div>
                                                <Typography variant="body2">
                                                    For : {row.leaveReason.name}
                                                    <p>{row.comments}</p>
                                                </Typography>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </ListItem>
                            <Divider variant="fullWidth" component="li" />
                        </React.Fragment>
                    ))}
            </List>
            <React.Fragment>
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogTitle>Reason</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Write the reason for rejection...</DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Enter reason"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                        <Button onClick={() => handleReject(rejectRow)}>Reject</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </>
    )
}
export default ApprovalList
