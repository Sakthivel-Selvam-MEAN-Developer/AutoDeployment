import InputWithType from '../../../../form/InputWithType'
import { ChangeEvent, FC, useState } from 'react'
import { AutoCompleteWithValue } from '../../../../form/AutoCompleteWithValue'
import { bunkField } from './types'

const BunkNameAndTypeFields: FC<bunkField> = ({ control }) => {
    return (
        <>
            <InputWithType control={control} label="Bunk Name" fieldName="bunkName" type="string" />
            <BunkTypeField control={control} />
        </>
    )
}
export default BunkNameAndTypeFields

const BunkTypeField: FC<bunkField> = ({ control }) => {
    const [bunkType, setBunkType] = useState<string>('')
    return (
        <AutoCompleteWithValue
            control={control}
            value={bunkType}
            fieldName="bunkType"
            label="Bunk Type"
            options={['HPCL', 'IOCL', 'BPCL', 'RIL', 'Nayara']}
            onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                setBunkType(newValue)
            }}
        />
    )
}
