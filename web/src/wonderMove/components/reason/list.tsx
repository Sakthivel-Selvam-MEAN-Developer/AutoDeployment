import React, {useEffect, useState} from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography'
import {getAllReasons, update} from '../../services/reason.ts'
import {Edit, Add} from '@mui/icons-material'
import {create} from '../../services/reason.ts'
import SuccessDialog from "../SuccessDialog.tsx";
import InputField from "./inputField.tsx";
interface reasonProps {
    id: number
    name: string
}
const ReasonList: React.FC = () => {
    const [reason, setReason] = useState([])
    const [isAdding, setIsAdding] = useState(false);
    const [newReason, setNewReason] = useState("")
    const [refreshData, setRefreshData] = useState(false)
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
    const [editReasonId, setEditReasonId] = useState<number | null>(null)
    const [oldReason, setOldReason] = useState<string | null>(null)
    const [message, setMessage] = useState<string>("")

    useEffect(() => {
        // @ts-ignore
        getAllReasons().then(setReason)
    }, [refreshData])

    const handleEditClick = (row: reasonProps) => {
        setOldReason(row.name)
        setEditReasonId(row.id)
    }
    const handleAdd = () => {
        setIsAdding(true)
    }
    const handleSave = () => {
        create(JSON.stringify({name: newReason}))
            .then(() => setRefreshData(true))
            .then(() => setOpenSuccessDialog(true))
        handleClose()
        setMessage("New Reason Added")
    }
    const handleClose = () => {
        setNewReason("")
        setOpenSuccessDialog(false)
        setIsAdding(false)
        setRefreshData(false)
        setEditReasonId(null)
        setMessage("")
    }
    const handleUpdate = () => {
        update(JSON.stringify({id: editReasonId, name: newReason}))
            .then(() => setRefreshData(true))
            .then(() => setOpenSuccessDialog(true))
        handleClose()
        setMessage("Reason Updated")
    }

    return (
        <>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                    List All Reasons
                    <span style={{ position: 'absolute', right: '10px' }}>
                        <IconButton data-testid={'add-button'} onClick={() => handleAdd()}>
                            <Add/>
                        </IconButton>
                    </span>
                </Typography>
                {reason.map((row: reasonProps, index: number) => (
                    <ListItem
                        key={index}
                        disableGutters
                        secondaryAction={
                            <IconButton aria-label="comment" onClick={() => handleEditClick(row)}>
                                <Edit />
                            </IconButton>
                        }
                    >
                        {editReasonId === row.id ? (
                            <>
                            <Typography variant="body1">{`${index + 1}`}.&nbsp;</Typography>
                            <InputField
                                value={oldReason}
                                onChange={(e: any) => setNewReason(e.target.value)}
                                onClear={handleClose}
                                onSave={handleUpdate}
                            /></>
                        ) : (
                        <ListItemText primary={`${index + 1}. ${row.name}`} />
                        )}
                    </ListItem>
                ))}
                {isAdding && (
                    <ListItem disableGutters>
                        {reason.length + 1}.&nbsp;
                        <InputField
                                value={newReason}
                                onChange={(e: any) => setNewReason(e.target.value)}
                                onClear={handleClose}
                                onSave={handleSave}
                            />
                    </ListItem>
            )}
            </List>
            <SuccessDialog
                open={openSuccessDialog}
                handleClose={handleClose}
                message={message}
            />
        </>
    )
}
export default ReasonList