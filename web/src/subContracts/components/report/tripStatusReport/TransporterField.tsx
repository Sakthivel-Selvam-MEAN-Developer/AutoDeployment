import { ChangeEvent, Dispatch, FC, useEffect, useState } from 'react'
import AutoComplete from '../../../../form/AutoComplete.tsx'
import { Control } from 'react-hook-form'
import { getAllTransporter } from '../../../services/transporter.ts'
import { getLoadingPointByCompanyName } from '../../../services/loadingPoint.ts'
import { dispatchType, FactoryFieldProps } from './tripStatusReportTypes.ts'

export const FactoryField: FC<FactoryFieldProps> = ({ control, cementCompanyName, dispatch }) => {
    const [loadingPointList, setLoadingPointList] = useState([])
    useEffect(() => {
        if (cementCompanyName !== '')
            getLoadingPointByCompanyName(cementCompanyName).then(setLoadingPointList)
    }, [cementCompanyName])
    return (
        <AutoComplete
            control={control}
            fieldName="factoryName"
            label="Select Factory"
            options={loadingPointList ? loadingPointList.map(({ name }) => name) : []}
            onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                const { id } = loadingPointList.find(({ name }) => name === newValue) || { id: 0 }
                dispatch({ loadinPointId: id, type: 'updateLoadinPointId' })
                dispatch({ pageNumber: 1, type: 'updatePageNumber' })
            }}
        />
    )
}
interface TransporterFieldProps {
    control: Control
    dispatch: Dispatch<dispatchType>
}
export const TransporterField: FC<TransporterFieldProps> = ({ control, dispatch }) => {
    const [transporter, setTransporter] = useState([])
    useEffect(() => {
        getAllTransporter().then(setTransporter)
    }, [])
    return (
        <AutoComplete
            control={control}
            fieldName="transporterName"
            label="Select Transporter"
            options={transporter ? transporter.map(({ name }) => name) : []}
            onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                const { id } = transporter.find(({ name }) => name === newValue) || { id: 0 }
                dispatch({ transporterId: id, type: 'updateTransporterId' })
                dispatch({ pageNumber: 1, type: 'updatePageNumber' })
            }}
        />
    )
}
