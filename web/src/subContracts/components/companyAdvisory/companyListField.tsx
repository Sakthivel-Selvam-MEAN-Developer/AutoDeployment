import { ChangeEvent, FC } from 'react'
import AutoComplete from '../../../form/AutoComplete'
import { advisory } from './types'

const AdvisoryList: FC<advisory> = ({ control, advisoryList, setAdvId }) => {
    return (
        <AutoComplete
            control={control}
            fieldName="advisoryList"
            label="Advisory List"
            options={advisoryList && advisoryList.map((advisory) => advisory.name)}
            onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                setAdvId(newValue)
            }}
        />
    )
}

export default AdvisoryList
