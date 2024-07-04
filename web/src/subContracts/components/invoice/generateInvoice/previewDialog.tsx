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
    update: () => void
}
interface dialogAction {
    setLoad: React.Dispatch<React.SetStateAction<boolean>>
    update: () => void
}
const PreviewDialog: FC<dialog> = ({ load, setLoad, pdfStr, update }) => {
    return (
        <Dialog maxWidth={'xl'} open={load}>
            <DialogTitle id="scroll-dialog-title">User Trip Details</DialogTitle>
            <DialogContentContainer pdfStr={pdfStr} />
            <DialogAction setLoad={setLoad} update={update} />
        </Dialog>
    )
}
export default PreviewDialog
interface DialogContentType {
    pdfStr: string
}
const DialogContentContainer: FC<DialogContentType> = ({ pdfStr }) => {
    return (
        <DialogContent>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
                <div dangerouslySetInnerHTML={{ __html: `${pdfStr}` }}></div>
            </DialogContentText>
        </DialogContent>
    )
}

const DialogAction: FC<dialogAction> = ({ setLoad, update }) => {
    return (
        <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={() => setLoad(false)} variant="outlined">
                Cancel
            </Button>
            <Button variant="contained" onClick={() => update()}>
                Download PDF
            </Button>
        </DialogActions>
    )
}
