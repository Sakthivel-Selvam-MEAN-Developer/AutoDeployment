import { DialogActions, Button } from '@mui/material'
import { FC } from 'react'

interface actions {
    setDialog: React.Dispatch<React.SetStateAction<boolean>>
    handleClick?: () => void
    text: string
}

const DialogActionFields: FC<actions> = ({ setDialog, handleClick, text }) => {
    return (
        <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={() => setDialog(false)} variant="outlined">
                Cancel
            </Button>
            <Button onClick={handleClick} variant="contained">
                {text}
            </Button>
        </DialogActions>
    )
}

export default DialogActionFields
