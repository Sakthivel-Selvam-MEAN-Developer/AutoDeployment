import { FC } from 'react'
import { formField } from './types'
import InputWithType from '../../../form/InputWithType'

const ReceivedAmountField: FC<formField> = ({ control }) => {
    return (
        <InputWithType
            control={control}
            label="Received Amount"
            fieldName="receivedAmount"
            type="number"
        />
    )
}

export default ReceivedAmountField
