import { FC, useState } from 'react'
import { TableCell, TextField } from '@mui/material'
import { ApproveButton, EditButton } from './buttons'
import { ShortageProps, TableFieldsProps, TextFieldConatinerProps } from './tableFieldsType'
export const TableFields: FC<TableFieldsProps> = ({ overallTrip }) => {
    const [editStatus, setEditStatus] = useState(true)
    const [quantity, setQuantity] = useState(overallTrip.shortageQuantity[0].unloadedQuantity)
    return (
        <>
            <ShortageConatiner
                editStatus={editStatus}
                shortage={overallTrip.shortageQuantity[0].unloadedQuantity}
                quantity={quantity}
                setQuantity={setQuantity}
            />
            <TableCell sx={{ textAlign: 'center' }}>
                <EditButton
                    setEditStatus={setEditStatus}
                    setQuantity={setQuantity}
                    shortage={overallTrip.shortageQuantity[0].unloadedQuantity}
                    editStatus={editStatus}
                />
                <ApproveButton
                    overallTrip={overallTrip}
                    quantity={quantity}
                    setQuantity={setQuantity}
                />
            </TableCell>
        </>
    )
}
const ShortageConatiner: FC<ShortageProps> = ({ editStatus, shortage, quantity, setQuantity }) => {
    return (
        <TableCell sx={{ textAlign: 'center' }}>
            {editStatus ? (
                shortage
            ) : (
                <TextFieldConatiner quantity={quantity} setQuantity={setQuantity} />
            )}
        </TableCell>
    )
}
const TextFieldConatiner: FC<TextFieldConatinerProps> = ({ quantity, setQuantity }) => (
    <TextField
        label="Edit Unloaded Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value !== '' ? parseFloat(e.target.value) : 0)}
    />
)
