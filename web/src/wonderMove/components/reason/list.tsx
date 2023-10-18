import React, {useEffect, useState} from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography'
import {getAllReasons, update} from '../../services/reason.ts'
import Input from '@mui/material/Input'
import {Edit, Add, Done, Clear} from '@mui/icons-material'
import {create} from '../../services/reason.ts'
import SuccessDialog from "../SuccessDialog.tsx";
interface reasonProps {
    id: number
    name: string
}
const ariaLabel = { 'aria-label': 'description' }
const ReasonList: React.FC = () => {
    const [reason, setReason] = useState([])
    const [isAdding, setIsAdding] = useState(false);
    const [newReason, setNewReason] = useState("")
    const [refreshData, setRefreshData] = useState(false)
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
    const [editReasonId, setEditReasonId] = useState<number | null>(null)

    useEffect(() => {
        // @ts-ignore
        getAllReasons().then(setReason)
    }, [refreshData])

    const handleEditClick = (row: reasonProps) => {
        setEditReasonId(row.id)
    }
    const handleAdd = () => {
        setIsAdding(true)
    }
    const handleSave = () => {
        create(JSON.stringify({name: newReason}))
            .then(() =>setRefreshData(true))
            .then(() => setOpenSuccessDialog(true))
        handleClose()
    }
    const handleClose = () => {
        setNewReason("")
        setOpenSuccessDialog(false)
        setIsAdding(false)
        setRefreshData(false)
        setEditReasonId(null)
    }
    const handleUpdate = () => {
        update(JSON.stringify({id: editReasonId, name: newReason}))
            .then(() =>setRefreshData(true))
            .then(() => setOpenSuccessDialog(true))
        handleClose()
    }

    return (
        <>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                    List All Reasons
                    <span style={{ position: 'absolute', right: '10px' }}>
                        <Add
                            data-testid={'add-button'}
                            onClick={() =>
                                handleAdd()
                            }/>
                    </span>
                </Typography>
                {reason.map((row: reasonProps, index: number) => (
                    <ListItem
                        key={index}
                        disableGutters
                        secondaryAction={
                            <IconButton aria-label="comment">
                                <Edit
                                    onClick={() =>
                                    handleEditClick(row)
                                }/>
                            </IconButton>
                        }
                    >
                        {editReasonId === row.id ? (
                            <Input
                                fullWidth
                                placeholder="Edit Reason"
                                inputProps={ariaLabel}
                                value={newReason}
                                onChange={(e) => setNewReason(e.target.value)}
                                endAdornment={
                                    <div style={{ display: 'flex', paddingRight: '8px', cursor: 'pointer' }}>
                                        <Clear data-testid={'close-button'} onClick={handleClose} />
                                        <Done data-testid={'update-button'} onClick={handleUpdate} />
                                    </div>
                                }
                            />
                        ) : (
                        <ListItemText primary={`${index + 1}. ${row.name}`} />
                        )}
                    </ListItem>
                ))}
                {isAdding && (
                    <ListItem disableGutters>
                        {reason.length + 1}.&nbsp;
                        <Input
                            fullWidth
                            placeholder="Add New Reason"
                            inputProps={ariaLabel}
                            value={newReason}
                            onChange={(e) => setNewReason(e.target.value)}
                            endAdornment={
                                <div style={{ display: 'flex', paddingRight: '8px', cursor: 'pointer' }}>
                                    <Clear data-testid={'close-button'} onClick={handleClose} />
                                    <Done data-testid={'done-button'} onClick={handleSave} />
                                </div>
                            }/>
                    </ListItem>
            )}
            </List>
            <SuccessDialog
                open={openSuccessDialog}
                handleClose={handleClose}
                message="New reason added"
            />
        </>
    )
}
export default ReasonList