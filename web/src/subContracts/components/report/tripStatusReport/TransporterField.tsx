import { ChangeEvent, Dispatch, FC, useEffect, useState } from 'react'
import AutoComplete from '../../../../form/AutoComplete.tsx'
import { Control } from 'react-hook-form'
import { getAllTransporter } from '../../../services/transporter.ts'
import { getLoadingPointByCompanyName } from '../../../services/loadingPoint.ts'
import DateInput from '../../../../form/DateInput.tsx'
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
            }}
        />
    )
}
interface DateFieldProps {
    control: Control
}
export const DateField: FC<DateFieldProps> = ({ control }) => {
    return (
        <>
            <DateInput
                control={control}
                format="DD/MM/YYYY"
                fieldName="from"
                label="Trip Start Date"
            />
            <DateInput control={control} format="DD/MM/YYYY" fieldName="to" label="Trip End Date" />
        </>
    )
}
