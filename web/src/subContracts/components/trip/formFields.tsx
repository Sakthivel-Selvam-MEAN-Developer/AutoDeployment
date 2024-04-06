import TextInput from '../../../form/TextInput.tsx'
import NumberInput from '../../../form/NumberInput.tsx'
import InputWithDefaultValue from '../../../form/InputWithDefaultValue.tsx'
import { FormControlLabel, InputAdornment, Switch, Table, TableCell, TableRow } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import { getTruckByTransporter } from '../../services/truck.ts'
import { getLoadingPointByCompanyName } from '../../services/loadingPoint.ts'
import { getUnloadingPointByCompanyName } from '../../services/unloadingPoint.ts'
import { Control, FieldValues, UseFormSetValue } from 'react-hook-form'
import { getStockPointByCompanyName } from '../../services/stockPoint.ts'
import { AutoCompleteWithValue } from '../../../form/AutoCompleteWithValue.tsx'
import { listFuelWithoutTripId } from '../../services/fuel.ts'
import DateInput from '../../../form/DateInput.tsx'
import Paper from '@mui/material/Paper'

interface transporterProps {
    name: string
    tdsPercentage: number
    transporterType: string
}
interface FuelProps {
    fueledDate: number
    invoiceNumber: string
    pricePerliter: number
    quantity: number
    totalprice: number
    vehicleNumber: string
    bunk: {
        bunkName: string
    }
}
interface FormFieldProps {
    control: Control
    transporter: transporterProps[]
    setTruckId: React.Dispatch<React.SetStateAction<number>>
    loadingPointId: React.Dispatch<React.SetStateAction<number | null>>
    unloadingPointId: React.Dispatch<React.SetStateAction<number | null>>
    stockPointId: React.Dispatch<React.SetStateAction<number | null>>
    cementCompany: string[]
    freightAmount: number
    transporterAmount: number
    totalFreightAmount: number | undefined
    totalTransporterAmount: number | undefined
    margin: number | undefined
    fuel: boolean
    setFuel: React.Dispatch<React.SetStateAction<boolean>>
    setCategory: React.Dispatch<React.SetStateAction<string>>
    setFreightAmount: React.Dispatch<React.SetStateAction<number>>
    setTransporterAmount: React.Dispatch<React.SetStateAction<number>>
    setOwnTruck: React.Dispatch<React.SetStateAction<boolean>>
    setownTruckFuel: React.Dispatch<React.SetStateAction<boolean>>
    category: string
    setValue: UseFormSetValue<FieldValues>
    ownTruck: boolean
    clear: boolean
    setDriverId: React.Dispatch<React.SetStateAction<number>>
    setListTruck: React.Dispatch<React.SetStateAction<never[]>>
    listTruck: never[]
    driversList: never[]
}
const FormField: React.FC<FormFieldProps> = ({
    control,
    transporter,
    setTruckId,
    cementCompany,
    loadingPointId,
    unloadingPointId,
    freightAmount,
    transporterAmount,
    totalFreightAmount,
    totalTransporterAmount,
    margin,
    fuel,
    setFuel,
    setCategory,
    category,
    stockPointId,
    setValue,
    setFreightAmount,
    setTransporterAmount,
    ownTruck,
    setownTruckFuel,
    clear,
    setListTruck,
    listTruck,
    setDriverId,
    driversList
}) => {
    const [transporterName, setTransporterName] = useState<string | null>('')
    const [cementCompanyName, setCementCompanyName] = useState<string | null>('')
    const [loadingPointList, setLoadingPointList] = useState([])
    const [unloadingPointList, setUnloadingPointList] = useState([])
    const [stockPointList, setStockPointList] = useState([])
    const [vehicleNumber, setVehicleNumber] = useState<string>('')
    const [disableWantFuel, setDisableWantFuel] = useState<boolean>(false)
    const [loadingPointName, setLoadingPointName] = useState<string>('')
    const [stockPointName, setStockPointName] = useState<string>('')
    const [unloadingPointName, setUnloadingPointName] = useState<string>('')
    const [fuelDetails, setFuelDetails] = useState<FuelProps>()
    const [driverName, setDriverName] = useState('')

    useEffect(() => {
        if (cementCompanyName !== null && cementCompanyName !== '')
            getLoadingPointByCompanyName(cementCompanyName).then(setLoadingPointList)
        if (transporterName !== null && transporterName !== '')
            getTruckByTransporter(transporterName).then(setListTruck)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [transporterName, cementCompanyName])

    useEffect(() => {
        if (cementCompanyName !== null && cementCompanyName !== '' && category === 'Stock Point')
            getStockPointByCompanyName(cementCompanyName).then(setStockPointList)
        else if (
            cementCompanyName !== null &&
            cementCompanyName !== '' &&
            category === 'Unloading Point'
        )
            getUnloadingPointByCompanyName(cementCompanyName).then(setUnloadingPointList)
    }, [category, cementCompanyName])
    useEffect(() => {
        setCementCompanyName(null)
        setTransporterName(null)
    }, [clear])
    const clearPointId = () => {
        loadingPointId(null)
        unloadingPointId(null)
        stockPointId(null)
    }
    useEffect(() => {
        setLoadingPointName('')
        setStockPointName('')
        setUnloadingPointName('')
        clearPointId()
        setFreightAmount(0)
        setTransporterAmount(0)
        setValue('invoiceNumber', '')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, cementCompanyName])

    useEffect(() => {
        setVehicleNumber('')
    }, [transporterName])

    useEffect(() => {
        if (vehicleNumber !== '')
            listFuelWithoutTripId(vehicleNumber).then((fuelDetails) => {
                if (fuelDetails !== null) {
                    setDisableWantFuel(true)
                    setFuelDetails(fuelDetails)
                    setownTruckFuel(false)
                } else {
                    setDisableWantFuel(false)
                    setownTruckFuel(true)
                }
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vehicleNumber])

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
                control={control}
                value={cementCompanyName !== null ? cementCompanyName : ''}
                fieldName="companyName"
                label="Company Name"
                options={cementCompany}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    setCementCompanyName(newValue)
                }}
            />
            <AutoCompleteWithValue
                control={control}
                value={transporterName !== null ? transporterName : ''}
                fieldName="transporterName"
                label="Transporter"
                options={transporter.map(({ name }) => name)}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    setTransporterName(newValue)
                }}
            />
            <DateInput
                control={control}
                format="DD/MM/YYYY"
                fieldName="tripDate"
                label="Trip Start Date"
            />
            <AutoCompleteWithValue
                value={vehicleNumber}
                control={control}
                fieldName="truckId"
                label="Truck Number"
                options={listTruck.map(({ vehicleNumber }) => vehicleNumber)}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    const { id } = listTruck.find(
                        (truck: { vehicleNumber: string }) => truck.vehicleNumber === newValue
                    ) || { id: 0 }
                    setTruckId(id)
                    setVehicleNumber(newValue)
                }}
            />
            <AutoCompleteWithValue
                value={driverName}
                control={control}
                fieldName="driverId"
                label="Select Driver"
                options={driversList.map(({ name }) => name)}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    const { id } = driversList.find(
                        (data: { name: string }) => data.name === newValue
                    ) || { id: 0 }
                    setDriverName(newValue)
                    setDriverId(id)
                }}
            />
            <AutoCompleteWithValue
                value={category}
                control={control}
                fieldName="category"
                label="Select Category"
                options={['Unloading Point', 'Stock Point']}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    setCategory(newValue)
                }}
            />
            <AutoCompleteWithValue
                value={loadingPointName}
                control={control}
                fieldName="loadingPointId"
                label="Loading Point"
                options={loadingPointList.map(({ name }) => name)}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    const { id } = loadingPointList.find(
                        (data: { name: string }) => data.name === newValue
                    ) || { id: 0 }
                    loadingPointId(id)
                    setLoadingPointName(newValue)
                }}
            />
            {category !== 'Stock Point' ? (
                <AutoCompleteWithValue
                    value={unloadingPointName}
                    control={control}
                    fieldName="unloadingPointId"
                    label="Unloading Point"
                    options={unloadingPointList.map(({ name }) => name)}
                    onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                        const { id } = unloadingPointList.find(
                            (data: { name: string }) => data.name === newValue
                        ) || { id: 0 }
                        unloadingPointId(id)
                        setUnloadingPointName(newValue)
                    }}
                />
            ) : (
                <AutoCompleteWithValue
                    value={stockPointName}
                    control={control}
                    fieldName="stockPointId"
                    label="Stock Point"
                    options={stockPointList.map(({ name }) => name)}
                    onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                        const { id } = stockPointList.find(
                            (data: { name: string }) => data.name === newValue
                        ) || { id: 0 }
                        stockPointId(id)
                        setStockPointName(newValue)
                    }}
                />
            )}
            <InputWithDefaultValue
                control={control}
                label="Company Freight"
                fieldName="freightAmount"
                type="number"
                defaultValue={freightAmount}
                value={freightAmount?.toFixed(2)}
                InputProps={{
                    readOnly: true,
                    endAdornment: (
                        <InputAdornment position="end">
                            <b>Rs</b>
                        </InputAdornment>
                    )
                }}
                InputLabelProps={{
                    shrink: true
                }}
            />
            {ownTruck === false && (
                <InputWithDefaultValue
                    control={control}
                    label="Transporter Freight"
                    fieldName="transporterAmount"
                    type="number"
                    defaultValue={transporterAmount}
                    value={transporterAmount?.toFixed(2)}
                    InputProps={{
                        readOnly: true,
                        endAdornment: (
                            <InputAdornment position="end">
                                <b>Rs</b>
                            </InputAdornment>
                        )
                    }}
                    InputLabelProps={{
                        shrink: true
                    }}
                />
            )}
            <TextInput control={control} label="Invoice Number" fieldName="invoiceNumber" />
            <NumberInput
                control={control}
                label="Quantity Loaded"
                fieldName="filledLoad"
                type="number"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <b>Ton</b>
                        </InputAdornment>
                    )
                }}
            />
            <InputWithDefaultValue
                control={control}
                label="Total Company Amount"
                fieldName="totalFreightAmount"
                type="number"
                defaultValue={totalFreightAmount}
                value={totalFreightAmount?.toFixed(2)}
                InputProps={{
                    readOnly: true,
                    endAdornment: (
                        <InputAdornment position="end">
                            <b>Rs</b>
                        </InputAdornment>
                    )
                }}
                InputLabelProps={{
                    shrink: true
                }}
            />
            {ownTruck === false && (
                <InputWithDefaultValue
                    control={control}
                    label="Total Transporter Amount"
                    fieldName="totalTransporterAmount"
                    type="number"
                    defaultValue={totalTransporterAmount}
                    value={totalTransporterAmount?.toFixed(2)}
                    InputProps={{
                        readOnly: true,
                        endAdornment: (
                            <InputAdornment position="end">
                                <b>Rs</b>
                            </InputAdornment>
                        )
                    }}
                    InputLabelProps={{
                        shrink: true
                    }}
                />
            )}
            {ownTruck === false && (
                <InputWithDefaultValue
                    control={control}
                    label="Total Margin"
                    fieldName="margin"
                    type="number"
                    defaultValue={margin}
                    value={margin?.toFixed(2)}
                    InputProps={{
                        readOnly: true,
                        endAdornment: (
                            <InputAdornment position="end">
                                <b>Rs</b>
                            </InputAdornment>
                        )
                    }}
                    InputLabelProps={{
                        shrink: true
                    }}
                />
            )}
            {ownTruck === false && (
                <FormControlLabel
                    disabled={disableWantFuel}
                    data-testid={'want-fuel'}
                    control={<Switch checked={fuel} onChange={() => setFuel(!fuel)} />}
                    label={fuel ? 'Fuel Required' : 'Fuel Not Required'}
                />
            )}
            <div>
                {fuelDetails && (
                    <Table sx={{ width: 650 }} component={Paper} aria-label="simple table">
                        <b>Fueled Details</b>
                        <br />
                        <TableRow>
                            <TableCell>Bunk</TableCell>
                            <TableCell>Fueled Date</TableCell>
                            <TableCell>Invoice Number</TableCell>
                            <TableCell>Price Per liter</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Total Price</TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>{fuelDetails.bunk.bunkName}</TableCell>
                            <TableCell>{fuelDetails.fueledDate}</TableCell>
                            <TableCell>{fuelDetails.invoiceNumber}</TableCell>
                            <TableCell>{fuelDetails.pricePerliter}</TableCell>
                            <TableCell>{fuelDetails.quantity}</TableCell>
                            <TableCell>{fuelDetails.totalprice}</TableCell>
                        </TableRow>
                    </Table>
                )}
            </div>
        </div>
    )
}

export default FormField
