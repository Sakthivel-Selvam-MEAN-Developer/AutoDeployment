import { TextField } from '@mui/material'
import { ReactElement } from 'react'
import { grid } from './tabs'
type type = (
    height: { height: string },
    setUpdate: grid['setUpdate'],
    update: grid['update']
) => ReactElement
export const getAmt: type = (height, setUpdate, update) => {
    return (
        <TextField
            type="number"
            label="Shortage Amount"
            sx={height}
            value={update.shortageAmount}
            onChange={(e) => {
                setUpdate((prev) => {
                    return { ...prev, shortageAmount: parseInt(e.target.value) }
                })
            }}
        />
    )
}
export const getAmtBill: type = (height, setUpdate, update) => {
    return (
        <TextField
            type="text"
            label="Shortage Bill No"
            sx={height}
            value={update.billNo}
            onChange={(e) => {
                setUpdate((prev) => {
                    return { ...prev, billNo: e.target.value }
                })
            }}
        />
    )
}
