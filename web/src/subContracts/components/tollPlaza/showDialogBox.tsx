import { Table, TableHead, TableBody, DialogContent } from '@mui/material'
import { tableRows } from './diaplayTableRow'
import { useEffect, useState } from 'react'
import { updateTollAmount } from '../../services/tollPlaza'
import { overallTripp } from './tollTypes'
import { listofColumns } from './editButton'
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
                        tableRows(
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
