import React, { ChangeEvent, useEffect, useState } from 'react'
import { Control } from 'react-hook-form'
import AutoComplete from '../../../../form/AutoComplete.tsx'
import { Autocomplete, Button, TextField } from '@mui/material'
import DateInput from '../../../../form/DateInput.tsx'
import { getAllTransporterName } from '../../../services/transporter.ts'
import { filterDataType } from './completedPayment.tsx'

interface FormFieldsProps {
    control: Control
    setFilterData: React.Dispatch<React.SetStateAction<filterDataType>>
}
export interface vendorProps {
    id: string
    bunkName: string
    name: string
    csmName: string
    employee?: {
        name: string
    }
}
interface csmType {
    id: string
    csmName: string
    employee?: {
        name: string
    }
}
const findUniqueCsName = (data: csmType[]) => {
    const filteredArr = data.reduce((acc: csmType[], current: csmType) => {
        const x = acc.find((item) => item.csmName === current.csmName)
        if (!x) {
            return acc.concat([current])
        } else {
            return acc
        }
    }, [])
    return filteredArr
}
const CompletedPaymentForm: React.FC<FormFieldsProps> = ({ control, setFilterData }) => {
    const [vendor, setVendor] = useState<vendorProps[]>([])
    const [csmNameList, setCsmNameList] = useState<csmType[]>([])
    useEffect(() => {
        getAllTransporterName().then((data) => {
            setVendor(data)
            setCsmNameList(findUniqueCsName(data))
        })
    }, [])
    return (
        <>
            <h4>Completed Payments</h4>
            <br />
            <div
                style={{
                    display: 'flex',
                    gap: '10px',
                    rowGap: '10px',
                    flexWrap: 'wrap',
                    alignItems: 'center'
                }}
            >
                <DateInput
                    control={control}
                    format="DD/MM/YYYY"
                    fieldName="from"
                    label="Payment From"
                />
                <DateInput
                    control={control}
                    format="DD/MM/YYYY"
                    fieldName="to"
                    label="Payment To"
                />
                <AutoComplete
                    control={control}
                    fieldName="name"
                    label="Select Vendor"
                    options={vendor ? vendor.map(({ name }) => name) : []}
                    onChange={(_event: ChangeEvent<HTMLInputElement>, value: string) => {
                        setCsmNameList(vendor.filter(({ name }) => name === value))
                        setFilterData((prev) => ({ ...prev, vendor: value }))
                    }}
                />
                <Autocomplete
                    options={csmNameList.map((transporter: csmType) => {
                        return {
                            id: transporter.id,
                            csmName: transporter.employee?.name || transporter.csmName
                        }
                    })}
                    sx={{ width: 300 }}
                    getOptionLabel={(option) => option.csmName}
                    renderOption={(props, option) => (
                        <li {...props} key={option.id}>
                            {option.csmName}
                        </li>
                    )}
                    renderInput={(params) => <TextField {...params} label="Select CSM" />}
                    onChange={(_event, value: csmType | null) => {
                        if (!value) return setCsmNameList(findUniqueCsName(vendor))
                        setCsmNameList([value])
                        setFilterData((prev) => ({
                            ...prev,
                            csmName: value.employee?.name || value.csmName
                        }))
                    }}
                />
                <AutoComplete
                    control={control}
                    fieldName="type"
                    label="Select Payment Type"
                    options={['Initial Pay', 'Final Pay', 'GST Pay']}
                    onChange={(_event: ChangeEvent<HTMLInputElement>, value: string) => {
                        const payType = value.toLocaleLowerCase()
                        setFilterData((prev) => ({ ...prev, payType }))
                    }}
                />
                <Button
                    color="secondary"
                    variant="contained"
                    type="submit"
                    style={{ marginLeft: '10px' }}
                >
                    Submit
                </Button>
            </div>
        </>
    )
}
export default CompletedPaymentForm
