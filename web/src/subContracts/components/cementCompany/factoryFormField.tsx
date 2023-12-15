import { ChangeEvent, useEffect, useState } from 'react'
import AutoComplete from '../../../form/AutoComplete.tsx'
import InputWithType from '../../../form/InputWithType.tsx'
import { Checkbox } from '@mui/material'
import { getAllCementCompany } from '../../services/cementCompany.ts'
import { Control } from 'react-hook-form'

interface FormFieldsProps {
    control: Control
    companyId: React.Dispatch<React.SetStateAction<number>>
}
const FactoryFormFields: React.FC<FormFieldsProps> = ({ control, companyId }) => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
    const [cementCompany, setCementCompany] = useState([])
    const [check1, setcheck1] = useState<boolean>(true)
    const [check2, setcheck2] = useState<boolean>(true)

    useEffect(() => {
        getAllCementCompany().then(setCementCompany)
    }, [])
    return (
        <div
            style={{
                display: 'flex',
                gap: '10px',
                rowGap: '10px',
                flexWrap: 'wrap'
            }}
        >
            <AutoComplete
                control={control}
                fieldName="companyName"
                label="Select Company"
                options={cementCompany.map(({ name }) => name)}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    const { id }: any = cementCompany.find(
                        (company: { name: string }) => company.name === newValue
                    )
                    companyId(id)
                }}
            />
            <div>
                <Checkbox onClick={() => setcheck1(!check1)} {...label} />
                <InputWithType
                    control={control}
                    disabled={check1}
                    label="Loading Point"
                    fieldName="loadingPoint"
                    type="string"
                />
            </div>

            <div>
                <Checkbox onClick={() => setcheck2(!check2)} {...label} />
                <InputWithType
                    control={control}
                    disabled={check2}
                    label="Unloading Point"
                    fieldName="unloadingPoint"
                    type="string"
                />
            </div>
        </div>
    )
}
export default FactoryFormFields
