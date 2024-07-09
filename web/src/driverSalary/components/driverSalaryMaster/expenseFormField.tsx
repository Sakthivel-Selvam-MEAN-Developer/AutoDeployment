import { ChangeEvent, useEffect, useState } from 'react'
import { Control } from 'react-hook-form'
import { AutoCompleteWithValue } from '../../../form/AutoCompleteWithValue.tsx'
import { InputAdornment } from '@mui/material'
import NumberInputWithProps from '../../../form/NumberInputwithProps.tsx'
import { AutocompleteWithDriverName } from './driverDetails.tsx'

interface FormFieldProps {
    control: Control
    driverTripDetails: driverTripDetailsProps[]
    setTripId: React.Dispatch<React.SetStateAction<number | undefined>>
    driverList: never[]
    setDriverId: React.Dispatch<React.SetStateAction<number>>
    driverId: number
    setDriverName: React.Dispatch<React.SetStateAction<string | null>>
    driverName: string | null
    setCategory: React.Dispatch<React.SetStateAction<string>>
    category: string
}
interface driverTripDetailsProps {
    id: number
    truck: {
        vehicleNumber: string | undefined
    }
    loadingPointToUnloadingPointTrip: {
        id: number
        loadingPoint: {
            id: number
            name: string
        }
        invoiceNumber: string
        startDate: number
    }
    loadingPointToStockPointTrip: {
        id: number
        loadingPoint: {
            id: number
            name: string
        }
        invoiceNumber: string
        startDate: number
    }
}
const expenseTypes = [
    'LOADING_CHARGES',
    'UNLOADING_CHARGES',
    'TOLL_EXPENSES',
    'TRIP_ALLOWANCE',
    'CASE_SLIP_EXPENSES',
    'ROUTE_ALLOWANCES',
    'OFFICE_EXPENSES',
    'GREASING_CHARGES',
    'AIR_CHECKUP_CHARGES',
    'TOOLS_SPARES_CHARGES',
    'WORKSHOP_SHOWROOM_CHARGES',
    'PHONE_ATM_CHARGES',
    'EMAIL_CHRGES',
    'PUNCTURE_CHARGES',
    'PARKING_CHARGES',
    'WEIGHT_BRIDGE_CHARGES',
    'OIL_CHARGES',
    'ADBLUE_OIL_CHARGES',
    'MECHANICAL_EXPENSES',
    'SAFETY_EXEPENSES',
    'ELECTRICAL_EXPENSES',
    'MISCELLANCEOUS_EXPENSES'
]
const ExpensesFormField: React.FC<FormFieldProps> = ({
    control,
    driverTripDetails,
    setTripId,
    driverList,
    setDriverId,
    setDriverName,
    driverId,
    driverName,
    setCategory,
    category
}) => {
    const [expense, setExpense] = useState('')
    const [invoice, setInvoice] = useState('')

    const handleTripSelection = (_: ChangeEvent<HTMLInputElement>, newValue: string) => {
        const trip = tripDetails.find(
            ({ invoiceNumber }: { invoiceNumber: string | undefined }) => {
                return invoiceNumber === newValue.split(' - ')[1]
            }
        )
        setInvoice(newValue)
        setTripId(trip?.id)
    }
    const tripDetails =
        driverTripDetails &&
        driverTripDetails.map((tripData) => {
            let tripType
            if (tripData.loadingPointToStockPointTrip !== null)
                tripType = tripData.loadingPointToStockPointTrip
            else if (tripData.loadingPointToUnloadingPointTrip !== null)
                tripType = tripData.loadingPointToUnloadingPointTrip
            return {
                id: tripData.id,
                invoiceNumber: tripType?.invoiceNumber,
                vehicleNumber: tripData?.truck.vehicleNumber
            }
        })
    useEffect(() => setInvoice(''), [driverId])
    return (
        <div
            style={{
                display: 'flex',
                gap: '10px',
                rowGap: '10px',
                flexWrap: 'wrap'
            }}
        >
            <AutocompleteWithDriverName
                driverList={driverList}
                setDriverId={setDriverId}
                driverName={driverName}
                setDriverName={setDriverName}
            />
            <AutoCompleteWithValue
                control={control}
                value={invoice}
                fieldName="tripId"
                label="Select Trip with Invoice Number"
                options={
                    tripDetails
                        ? tripDetails.map((data) => `${data.vehicleNumber} - ${data.invoiceNumber}`)
                        : []
                }
                onChange={handleTripSelection}
            />
            <AutoCompleteWithValue
                control={control}
                value={category}
                fieldName="category"
                label="Select Category"
                options={['Driver Advance', 'Driver Expense']}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) =>
                    setCategory(newValue)
                }
            />
            {category === 'Driver Expense' && (
                <AutoCompleteWithValue
                    control={control}
                    value={expense}
                    fieldName="expenseType"
                    label="Expense Type"
                    options={expenseTypes.map((type) => type)}
                    onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                        setExpense(newValue)
                    }}
                />
            )}
            {category === 'Driver Expense' && (
                <NumberInputWithProps
                    control={control}
                    label="Expense Amount"
                    fieldName="amount"
                    type="number"
                    inputProps={{ step: 'any', min: '0' }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <b>Rs</b>
                            </InputAdornment>
                        )
                    }}
                />
            )}
            {category === 'Driver Advance' && (
                <NumberInputWithProps
                    control={control}
                    label="Driver Advance"
                    fieldName="driverAdvance"
                    type="number"
                    inputProps={{ step: 'any', min: '0' }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <b>Rs</b>
                            </InputAdornment>
                        )
                    }}
                />
            )}
        </div>
    )
}

export default ExpensesFormField
