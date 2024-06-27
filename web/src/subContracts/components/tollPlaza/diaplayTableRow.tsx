import { TableRow, TableCell, Button } from '@mui/material'
import { tableColumns } from './editIcon'
import { tableColumn } from './editButton'
import { SetStateAction } from 'react'
export function tableRows(
    toll: { id: number; tollPlazaLocation: { id: number; location: string }; amount: number },
    editMode: { [key: number]: boolean },
    tollAmounts: { [key: number]: number },
    handleAmountChange: (id: number, newAmount: number) => void,
    handleSaveClick: (id: number, tollPaymentId: number) => void,
    handleEditClick: (id: number) => void
) {
    return (
        <TableRow key={toll.id}>
            <TableCell>{toll.tollPlazaLocation.location}</TableCell>
            {tableColumn(editMode, toll, tollAmounts, handleAmountChange)}
            {tableColumns(editMode, toll, handleSaveClick, handleEditClick)}
        </TableRow>
    )
}
export function submitButton(
    handleSubmit: () => Promise<void>,
    setIsSubmitEnabled: { (value: SetStateAction<boolean>): void; (arg0: boolean): void },
    isSubmitEnabled: boolean
) {
    return (
        <Button
            onClick={async () => {
                await handleSubmit()
                setIsSubmitEnabled(false)
            }}
            color="primary"
            disabled={!isSubmitEnabled}
        >
            Submit
        </Button>
    )
}
export function closeButton(handleClose: () => void) {
    return (
        <Button onClick={handleClose} color="primary">
            Close
        </Button>
    )
}
