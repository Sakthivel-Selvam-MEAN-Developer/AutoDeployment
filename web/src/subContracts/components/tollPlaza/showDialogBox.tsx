import { Table, TableHead, TableRow, TableCell, TableBody, DialogContent } from '@mui/material'
import { tableColumns } from './editIcon'
import { useEffect, useState } from 'react'
import { updateTollAmount } from '../../services/tollPlaza'
import { overallTripp } from './type'
import { listofColumns, tableColumn } from './editButton'
const tableStructure = <TableHead>{listofColumns()}</TableHead>
export const ShowDialogBox = (selectedToll: overallTripp['tollPayment'] | undefined) => {
    const [editMode, setEditMode] = useState<{ [key: number]: boolean }>({})
    const [tollAmounts, setTollAmounts] = useState<{ [key: number]: number }>({})
    useEffect(() => {
        if (selectedToll) {
            const initialAmounts = selectedToll.reduce(
                (acc, toll) => {
                    acc[toll.tollPlazaLocation.id] = toll.amount
                    return acc
                },
                {} as { [key: number]: number }
            )
            setTollAmounts(initialAmounts)
        }
    }, [selectedToll])

    const handleEditClick = (id: number) => {
        setEditMode((prevState) => ({ ...prevState, [id]: true }))
    }

    const handleSaveClick = (id: number, tollPaymentId: number) => {
        console.log(id, tollPaymentId)
        setEditMode((prevState) => ({ ...prevState, [id]: false }))
        const updatedAmount = tollAmounts[id]
        updateTollAmount([tollPaymentId], { amount: updatedAmount })
            .then((response) => {
                console.log('response', response)
            })
            .catch((error) => {
                console.error('error', error)
            })
    }

    const handleAmountChange = (id: number, newAmount: number) => {
        setTollAmounts((prevState) => ({ ...prevState, [id]: newAmount }))
    }

    return (
        <DialogContent>
            <Table>
                {tableStructure}
                <TableBody>
                    {selectedToll?.map((toll) =>
                        tableRow(
                            toll,
                            editMode,
                            tollAmounts,
                            handleAmountChange,
                            handleSaveClick,
                            handleEditClick
                        )
                    )}
                </TableBody>
            </Table>
        </DialogContent>
    )
}
function tableRow(
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
