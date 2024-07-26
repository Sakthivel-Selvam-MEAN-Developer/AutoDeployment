import { Dispatch, FC, ChangeEvent } from 'react'
import { Control } from 'react-hook-form'
import AutoComplete from '../../../../form/AutoComplete'
import { dispatchType } from './tripStatusReportTypes'

interface TransporterProps {
    control: Control
    dispatch: Dispatch<dispatchType>
}
export const TransporterTypeField: FC<TransporterProps> = ({ control, dispatch }) => {
    return (
        <AutoComplete
            control={control}
            fieldName="transporterType"
            label="Select Transporter Type"
            options={['Own', 'Market Transporter']}
            onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                dispatch({ transporterType: newValue, type: 'updateTransporterType' })
                dispatch({ pageNumber: 1, type: 'updatePageNumber' })
            }}
        />
    )
}
