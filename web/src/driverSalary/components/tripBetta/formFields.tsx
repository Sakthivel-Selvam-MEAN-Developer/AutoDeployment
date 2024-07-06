import { Control } from 'react-hook-form'
import { AutoCompleteWithValue } from '../../../form/AutoCompleteWithValue'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { getLoadingPointByCompanyName } from '../../../subContracts/services/loadingPoint'
import { getStockPointByCompanyName } from '../../../subContracts/services/stockPoint'
import { getUnloadingPointByCompanyName } from '../../../subContracts/services/unloadingPoint'
import { InputAdornment } from '@mui/material'
import { cementCompanyProps } from './list'
import { getTripSalaryDetailsById } from '../../services/tripBetta'
import NumberInputWithValue from '../../../form/NumberInputWithValue'

interface tripBettaFormFieldsProps {
    control: Control
    cementCompany: cementCompanyProps[]
    setUnloadingPointId: React.Dispatch<React.SetStateAction<number | null>>
    setLoadingPointId: React.Dispatch<React.SetStateAction<number | null>>
    setStockPointId: React.Dispatch<React.SetStateAction<number | null>>
    loadingPointId: number | null
    unloadingPointId: number | null
    stockPointId: number | null
    category: string
    cementCompanyName: string
    setCementCompanyName: React.Dispatch<React.SetStateAction<string>>
    setCategory: React.Dispatch<React.SetStateAction<string>>
    setCementCompanyId: React.Dispatch<React.SetStateAction<number>>
    setTripSalary: React.Dispatch<React.SetStateAction<number>>
    setAppPayAdvance: React.Dispatch<React.SetStateAction<number>>
    setDailySalary: React.Dispatch<React.SetStateAction<number>>
    tripSalary: number
    appPayAdvance: number
    dailySalary: number
    clear: boolean
}
interface salaryDetailsProps {
    dailyBetta: number
    appPayAdvance: number
    tripBetta: number
}
const TripBettaFormFields: FC<tripBettaFormFieldsProps> = ({
    control,
    cementCompany,
    setLoadingPointId,
    setUnloadingPointId,
    setStockPointId,
    loadingPointId,
    unloadingPointId,
    stockPointId,
    category,
    setCementCompanyName,
    setCategory,
    cementCompanyName,
    setCementCompanyId,
    setTripSalary,
    setAppPayAdvance,
    setDailySalary,
    tripSalary,
    appPayAdvance,
    dailySalary,
    clear
}) => {
    const [loadingPointList, setLoadingPointList] = useState([])
    const [unloadingPointList, setUnloadingPointList] = useState([])
    const [stockPointList, setStockPointList] = useState([])
    const [loadingPointName, setLoadingPointName] = useState('')
    const [unloadingPointName, setUnloadingPointName] = useState('')
    const [stockPointName, setStockPointName] = useState('')
    useEffect(() => {
        setLoadingPointName('')
        setUnloadingPointName('')
        setStockPointName('')
        setLoadingPointId(null)
        setUnloadingPointId(null)
        setStockPointId(null)
    }, [clear, category])
    useEffect(() => {
        if (cementCompanyName !== '') {
            getLoadingPointByCompanyName(cementCompanyName).then(setLoadingPointList)
            getUnloadingPointByCompanyName(cementCompanyName).then(setUnloadingPointList)
            getStockPointByCompanyName(cementCompanyName).then(setStockPointList)
        }
    }, [cementCompanyName])
    useEffect(() => {
        if (
            (loadingPointId && unloadingPointId) ||
            (stockPointId && loadingPointId) ||
            (stockPointId && unloadingPointId)
        ) {
            getTripSalaryDetailsById(loadingPointId, unloadingPointId, stockPointId).then(
                (salaryDetails: salaryDetailsProps) => {
                    setTripSalary(salaryDetails.tripBetta)
                    setAppPayAdvance(salaryDetails.appPayAdvance)
                    setDailySalary(salaryDetails.dailyBetta)
                }
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadingPointId, unloadingPointId, stockPointId])

    return (
        <div
            style={{
                display: 'flex',
                gap: '10px',
                rowGap: '10px',
                flexWrap: 'wrap'
            }}
        >
            <AutoCompleteWithValue
                value={cementCompanyName}
                control={control}
                fieldName="companyName"
                label="Select Company"
                data-testid={'select'}
                options={cementCompany && cementCompany.map((company) => company.name)}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    const selectedCompany = cementCompany.find(
                        (company) => company.name === newValue
                    )
                    setCementCompanyId(selectedCompany ? selectedCompany.id : 0)
                    setCementCompanyName(newValue)
                }}
            />
            <AutoCompleteWithValue
                control={control}
                value={category}
                fieldName="category"
                label="Select Category"
                options={['Loading - Unloading', 'Loading - Stock', 'Stock - Unloading']}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    setCategory(newValue)
                }}
            />
            {(category === 'Loading - Unloading' ||
                category === 'Loading - Stock' ||
                category === '' ||
                category === null) && (
                <AutoCompleteWithValue
                    value={loadingPointName}
                    control={control}
                    fieldName="loadingPointId"
                    label="Loading Point"
                    options={loadingPointList && loadingPointList.map(({ name }) => name)}
                    onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                        const { id } = loadingPointList.find(
                            (data: { name: string }) => data.name === newValue
                        ) || { id: 0 }
                        setLoadingPointId(id)
                        setLoadingPointName(newValue)
                    }}
                />
            )}
            {(category === 'Stock - Unloading' || category === 'Loading - Stock') && (
                <AutoCompleteWithValue
                    value={stockPointName}
                    control={control}
                    fieldName="stockPointId"
                    label="Stock Point"
                    options={stockPointList && stockPointList.map(({ name }) => name)}
                    onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                        const { id } = stockPointList.find(
                            (data: { name: string }) => data.name === newValue
                        ) || { id: 0 }
                        setStockPointId(id)
                        setStockPointName(newValue)
                    }}
                />
            )}
            {(category === 'Loading - Unloading' ||
                category === 'Stock - Unloading' ||
                category === '' ||
                category === null) && (
                <AutoCompleteWithValue
                    value={unloadingPointName}
                    control={control}
                    fieldName="unloadingPointId"
                    label="Unloading Point"
                    options={unloadingPointList && unloadingPointList.map(({ name }) => name)}
                    onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                        const { id } = unloadingPointList.find(
                            (data: { name: string }) => data.name === newValue
                        ) || { id: 0 }
                        setUnloadingPointId(id)
                        setUnloadingPointName(newValue)
                    }}
                />
            )}
            <NumberInputWithValue
                control={control}
                value={tripSalary}
                onChange={(event) => setTripSalary(parseInt(event.target.value))}
                label="Trip Salary"
                fieldName="tripSalary"
                type="number"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <b>{`\u20B9`}</b>
                        </InputAdornment>
                    )
                }}
            />
            <NumberInputWithValue
                control={control}
                value={appPayAdvance}
                onChange={(event) => setAppPayAdvance(parseInt(event.target.value))}
                label="App Pay Advance"
                fieldName="appPayAdvance"
                type="number"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <b>{`\u20B9`}</b>
                        </InputAdornment>
                    )
                }}
            />
            <NumberInputWithValue
                control={control}
                value={dailySalary}
                onChange={(event) => setDailySalary(parseInt(event.target.value))}
                label="Driver Daily Salary"
                fieldName="dailySalary"
                type="number"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <b>{`\u20B9`}</b>
                        </InputAdornment>
                    )
                }}
            />
        </div>
    )
}

export default TripBettaFormFields
