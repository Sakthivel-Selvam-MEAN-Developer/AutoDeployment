import { ChangeEvent, useEffect } from 'react'
import { Control } from 'react-hook-form'
import AutoComplete from '../../../form/AutoComplete.tsx'
import { Button } from '@mui/material'
import { vendorProps } from './completedPayment.tsx'
import DateInput from '../../../form/DateInput.tsx'
import { getAllTransporterName } from '../../services/transporter.ts'
import { getAllBunkName } from '../../services/bunk.ts'

interface FormFieldsProps {
    control: Control
    vendor: vendorProps[]
    setName: React.Dispatch<React.SetStateAction<string>>
    setVendor: React.Dispatch<React.SetStateAction<vendorProps[]>>
}
const CompletedPaymentForm: React.FC<FormFieldsProps> = ({
    control,
    vendor,
    setVendor,
    setName
}) => {
    useEffect(() => {
        getAllTransporterName()
            .then(setVendor)
            .then(() =>
                getAllBunkName().then(
                    (data) =>
                        data &&
                        data.map((bunk: vendorProps) =>
                            setVendor((prev) => [...prev, { ...bunk, name: bunk.bunkName }])
                        )
                )
            )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <p>
                <b>Completed Payments</b>
            </p>{' '}
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
                        setName(value)
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
