import { SetStateAction, useState } from 'react'
import { DialogActions, Button } from '@mui/material'
import { submitButton, closeButton } from './diaplayTableRow'
type TollButtonProps = (
    handleAddTollEntry: () => void,
    handleClose: () => void,
    handleSubmit: () => Promise<void>
) => JSX.Element
export const TollButton: TollButtonProps = (handleAddTollEntry, handleClose, handleSubmit) => {
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false)
    const handleAddClick = () => {
        handleAddTollEntry()
        setIsSubmitEnabled(true)
    }
    return DialogAction(
        handleAddClick,
        handleClose,
        handleSubmit,
        setIsSubmitEnabled,
        isSubmitEnabled
    )
}
export const DialogAction = (
    handleAddClick: () => void,
    handleClose: () => void,
    handleSubmit: () => Promise<void>,
    setIsSubmitEnabled: { (value: SetStateAction<boolean>): void; (arg0: boolean): void },
    isSubmitEnabled: boolean
): JSX.Element => {
    return (
        <DialogActions>
            {addButton(handleAddClick)}
            {closeButton(handleClose)}
            {submitButton(handleSubmit, setIsSubmitEnabled, isSubmitEnabled)}
        </DialogActions>
    )
}
function addButton(handleAddClick: () => void) {
    return (
        <Button onClick={handleAddClick} color="primary">
            Add
        </Button>
    )
}
