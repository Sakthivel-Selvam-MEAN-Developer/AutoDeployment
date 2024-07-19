import { useForm } from 'react-hook-form'
import FormFields from './formFields'
import { Button } from '@mui/material'
import { onSubmit } from './onSubmit'
// import { getCompanyInvoiceNames } from '../../services/viewInvoice'

const CompanyAdvisory = () => {
    const { handleSubmit, control } = useForm()
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormFields control={control} />
            <Button type="submit" variant="contained" sx={{ margin: '20px 0' }}>
                Create
            </Button>
        </form>
    )
}
export default CompanyAdvisory
