import React, {useEffect, useState} from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography'
import {getAllReasons} from '../../services/reason.ts'
// import {create} from '../../services/reason.ts'
import Input from '@mui/material/Input'
import DoneIcon from '@mui/icons-material/Done'
import ClearIcon from '@mui/icons-material/Clear'
interface reasonProps {
    id: number
    name: string
}
const ariaLabel = { 'aria-label': 'description' }
const ReasonList: React.FC = () => {
    const [reason, setReason] = useState([])
    const [isAdding, setIsAdding] = useState(false);
    const [newReason, setNewReason] = useState("")
    useEffect(() => {
        // @ts-ignore
        getAllReasons().then(setReason)
    }, [])

    const handleEditClick = (row: reasonProps) => {
        console.log(row.id)
    }
    const handleAdd = () => {
        setIsAdding(true)
    }
    const handleSave = () => {
        console.log(newReason)
        handleClose()
    }
    const handleClose = () => {
        setNewReason("")
        setIsAdding(false)
    }

    return (
        <>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                    List All Reasons
                    <span style={{ position: 'absolute', right: '10px' }}>
                        <AddIcon
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
                                <EditIcon
                                    onClick={() =>
                                    handleEditClick(row)
                                }/>
                            </IconButton>
                        }
                    >
                        <ListItemText primary={`${index + 1}. ${row.name}`} />
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
                               <div style={{ display: 'flex', paddingRight: '8px', cursor: 'pointer'  }}>
                                   <ClearIcon onClick={handleClose} />
                                   <DoneIcon onClick={handleSave} />
                               </div>
                           }/>
                </ListItem>
            )}
            </List>
        </>
    )
}
export default ReasonList