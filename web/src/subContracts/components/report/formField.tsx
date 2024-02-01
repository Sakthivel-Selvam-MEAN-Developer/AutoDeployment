import { ChangeEvent, useEffect, useState } from 'react'
import AutoComplete from '../../../form/AutoComplete.tsx'
import { Control } from 'react-hook-form'
import { getAllCementCompany } from '../../services/cementCompany.ts'
import { getAllTransporter } from '../../services/transporter.ts'
import { getLoadingPointByCompanyName } from '../../services/loadingPoint.ts'

export interface FormFieldsProps {
    control: Control
    setCementCompanyId: React.Dispatch<React.SetStateAction<number>>
    setTransporterId: React.Dispatch<React.SetStateAction<number>>
    setLoadingPointId: React.Dispatch<React.SetStateAction<number>>
}
const FilterReport: React.FC<FormFieldsProps> = ({
    control,
    setLoadingPointId,
    setCementCompanyId,
    setTransporterId
}) => {
    const [cementCompany, setCementCompany] = useState([])
    const [transporter, setTransporter] = useState([])
    const [loadingPointList, setLoadingPointList] = useState([])
    const [cementCompanyName, setCementCompanyName] = useState('')

    useEffect(() => {
        getAllCementCompany().then(setCementCompany)
        getAllTransporter().then(setTransporter)
    }, [])
    useEffect(() => {
        if (cementCompanyName !== '')
            getLoadingPointByCompanyName(cementCompanyName).then(setLoadingPointList)
    }, [cementCompanyName])

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
                data-testid={'select'}
                options={cementCompany.map(({ name }) => name)}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    const { id } = cementCompany.find(({ name }) => name === newValue) || { id: 0 }
                    setCementCompanyId(id)
                    setCementCompanyName(newValue)
                }}
            />
            <AutoComplete
                control={control}
                fieldName="transporterName"
                label="Select Transporter"
                data-testid={'select'}
                options={transporter.map(({ name }) => name)}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    const { id } = transporter.find(({ name }) => name === newValue) || { id: 0 }
                    setTransporterId(id)
                }}
            />
            <AutoComplete
                control={control}
                fieldName="factoryName"
                label="Select Factory"
                data-testid={'select'}
                options={loadingPointList.map(({ name }) => name)}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    const { id } = loadingPointList.find(({ name }) => name === newValue) || {
                        id: 0
                    }
                    setLoadingPointId(id)
                }}
            />
        </div>
    )
}
export default FilterReport
