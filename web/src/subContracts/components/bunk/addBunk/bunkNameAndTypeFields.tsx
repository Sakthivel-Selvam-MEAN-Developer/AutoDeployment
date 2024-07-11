import InputWithType from '../../../../form/InputWithType'
import { ChangeEvent, FC } from 'react'
import { AutoCompleteWithValue } from '../../../../form/AutoCompleteWithValue'
import { bunkField } from './formFields'

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
    return (
        <AutoCompleteWithValue
            control={control}
            value={''}
            fieldName="bunkType"
            label="Bunk Type"
            options={['HPCL', 'IOCL', 'BPCL', 'RIL', 'Nayara']}
            onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                console.log(newValue)
            }}
        />
    )
}
