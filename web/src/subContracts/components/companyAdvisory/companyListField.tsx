import { ChangeEvent, FC } from 'react'
import AutoComplete from '../../../form/AutoComplete'
import { company } from './types'

const CompanyList: FC<company> = ({ control, companyList, setCpnyName }) => {
    return (
        <AutoComplete
            control={control}
            fieldName="companyList"
            label="Company List"
            options={companyList && companyList.map((company) => company.name)}
            onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                setCpnyName(newValue)
            }}
        />
    )
}

export default CompanyList
