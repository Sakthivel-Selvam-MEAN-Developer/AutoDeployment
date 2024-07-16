import InputWithType from '../../../../form/InputWithType'
import { FC } from 'react'
import { bunkField } from './types'
import AutoComplete from '../../../../form/AutoComplete'

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
        <AutoComplete
            control={control}
            fieldName="bunkType"
            label="Bunk Type"
            options={['HPCL', 'IOCL', 'BPCL', 'RIL', 'Nayara', 'Shell']}
            onChange={() => {}}
        />
    )
}
