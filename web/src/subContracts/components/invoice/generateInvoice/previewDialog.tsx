import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@mui/material'
import { FC } from 'react'

interface dialog {
    load: boolean
    setLoad: React.Dispatch<React.SetStateAction<boolean>>
    pdfStr: string
}
interface dialogAction {
    setLoad: React.Dispatch<React.SetStateAction<boolean>>
}
const PreviewDialog: FC<dialog> = ({ load, setLoad, pdfStr }) => {
    return (
        <Dialog maxWidth={'xl'} open={load}>
            <DialogTitle id="scroll-dialog-title">User Trip Details</DialogTitle>
            <DialogContent>
                <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
                    <div dangerouslySetInnerHTML={{ __html: `${pdfStr}` }}></div>
                </DialogContentText>
            </DialogContent>
            <DialogAction setLoad={setLoad} />
        </Dialog>
    )
}
export default PreviewDialog

const DialogAction: FC<dialogAction> = ({ setLoad }) => {
    return (
        <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={() => setLoad(false)} variant="outlined">
                Cancel
            </Button>
            <Button variant="contained" onClick={() => {}}>
                Download PDF
            </Button>
        </DialogActions>
    )
}
