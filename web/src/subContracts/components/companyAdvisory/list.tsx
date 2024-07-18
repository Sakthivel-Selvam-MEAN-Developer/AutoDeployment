import { useForm } from 'react-hook-form'
import FormFields from './formFields'
import { Button } from '@mui/material'
import { onSubmit } from './onSubmit'
import { useEffect, useState } from 'react'
// import { getCompanyInvoiceNames } from '../../services/viewInvoice'
import { invocieList } from './types'

const CompanyAdvisory = () => {
    const { handleSubmit, control } = useForm()
    const [invoiceList] = useState<invocieList['invoiceList']>([])
    useEffect(() => {
        // getCompanyInvoiceNames().then(setInvoiceList)
    }, [])
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormFields control={control} invoiceList={invoiceList} />
            <Button type="submit" variant="contained" sx={{ margin: '20px 0' }}>
                Create
            </Button>
        </form>
    )
}
export default CompanyAdvisory
