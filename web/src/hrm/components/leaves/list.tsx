import {
    Button,
    Divider,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Typography
} from '@mui/material'
import React, { useEffect, useState, useContext } from 'react'
import { name } from '../context'
import { useNavigate } from 'react-router-dom'
import { epochToMinimalDate } from '../../../wonderMove/components/epochToTime'
import { getAllLeaveWithStatus } from '../../services/employeeLeave'
import config from '../../../../config'

const LeaveList: React.FC = () => {
    const username: any = useContext(name)
    const navigate = useNavigate()
    const [allLeave, setAllLeave] = useState([])
    const [selectedRow, setSelectedRow] = useState<any | null>(null)
    const employeeId = config.EMPLOYEE_ID

    useEffect(() => {
        getAllLeaveWithStatus(employeeId).then(setAllLeave)
    }, [])

    const handleListItemClick = (rowId: number) => {
        setSelectedRow(selectedRow === rowId ? null : rowId)
    }

    const gstStatus = (row: any) => {
        if (row.approval === true) {
            return 'Approved'
        } else if (row.approval === false) {
            return 'Rejected'
        } else {
            return 'Pending'
        }
    }

    const getApprovalStatus = (row: any) => {
        if (row.approval === true) {
            return 'Permission Granted'
        } else if (row.approval === false) {
            return row.deniedComment ? row.deniedComment : 'No comment provided'
        } else {
            return 'Pending'
        }
    }

    return (
        <>
            <div
                style={{
                    marginBottom: '30px',
                    display: 'flex',
                    justifyContent: 'right'
                }}
            >
                <Button color="primary" variant="contained" onClick={() => navigate('apply')}>
                    Apply Leave
                </Button>
            </div>
            <List>
                {allLeave.map((row: any) => (
                    <React.Fragment key={row.id}>
                        <ListItem
                            key={row.id}
                            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        >
                            <div onClick={() => handleListItemClick(row.id)}>
                                <ListItemText
                                    primary={(username.displayName = row.employee.name)}
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
                                            <ListItemSecondaryAction>
                                                {gstStatus(row)}
                                            </ListItemSecondaryAction>
                                        </React.Fragment>
                                    }
                                />
                                {selectedRow == row.id && (
                                    <Typography variant="body2">
                                        For : {row.leaveReason.name}
                                        <p>{getApprovalStatus(row)}</p>
                                    </Typography>
                                )}
                            </div>
                        </ListItem>
                        <Divider variant="fullWidth" component="li" />
                    </React.Fragment>
                ))}
            </List>
        </>
    )
}
export default LeaveList
