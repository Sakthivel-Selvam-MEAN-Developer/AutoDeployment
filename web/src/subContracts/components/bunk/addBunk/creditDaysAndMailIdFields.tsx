import { FC } from 'react'
import InputWithType from '../../../../form/InputWithType'
import { bunkField } from './types'

const CreditDaysAndMailFields: FC<bunkField> = ({ control }) => {
    return (
        <>
            <InputWithType control={control} label="E-Mail ID" fieldName="mailId" type="email" />
            <InputWithType
                control={control}
                label="Credit Days"
                fieldName="creditDays"
                type="number"
            />
        </>
    )
}

export default CreditDaysAndMailFields
