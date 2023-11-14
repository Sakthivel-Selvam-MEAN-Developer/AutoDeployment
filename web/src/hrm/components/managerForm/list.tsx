import React, { useEffect, useState } from "react";
import { Divider, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Typography } from "@mui/material";
import { approveLeaves, getAllLeaveAfterApply, rejectLeaves } from "../../services/employeeLeave";
import { epochToMinimalDate } from "../../../wonderMove/components/epochToTime";
import { Done, Close } from '@mui/icons-material'

const ManagerFormList: React.FC = () => {
    const [allList, setAllList] = useState([])
    const [selectedRow, setSelectedRow] = useState<any | null>(null)

    useEffect(() => {
        // @ts-ignore
        getAllLeaveAfterApply().then(setAllList)
    }, [])
    const rejectClick = (row: any) => {
        rejectLeaves(row.id, { appliedBy: row.appliedBy })
    }
    const approveClick = (row: any) => {
        approveLeaves(row.id, { appliedBy: row.appliedBy })
    }
    const handleListItemClick = (rowId: number) => {
        setSelectedRow(selectedRow === rowId ? null : rowId)
    }


    return (
        <List>
            {allList.map((row: any) => (
                <React.Fragment key={row.id}>
                    <ListItem key={row.id} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <div onClick={() => handleListItemClick(row.id)}>
                            <ListItemText
                                primary={row.appliedBy}
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
                                        <IconButton aria-label="deny" onClick={() => rejectClick(row)}>
                                            <Close />
                                        </IconButton>
                                        <IconButton aria-label="approve" onClick={() => approveClick(row)}>
                                            <Done />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                    <div>
                                        <Typography variant="body2">For : {row.leaveReason.name}</Typography>
                                        <p>Comments comes here...</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </ListItem>
                    <Divider variant="fullWidth" component="li" />
                </React.Fragment>
            ))}
        </List>
    );
};
export default ManagerFormList;