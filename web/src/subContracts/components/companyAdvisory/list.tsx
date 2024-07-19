import { useForm } from 'react-hook-form'
import FormFields from './advisoryFormFields'
import { onCreate, onUpdate } from './onSubmit'
import UpdateFormFields from './updateFormFields'

const CompanyAdvisory = () => {
    const { handleSubmit, control } = useForm()
    return (
        <>
            <form onSubmit={handleSubmit(onCreate)}>
                <h4>Add Advisory</h4>
                <FormFields control={control} />
            </form>
            <form onSubmit={handleSubmit(onUpdate)} style={{ marginTop: '100px' }}>
                <h4>Update Invocie</h4>
                <UpdateFormFields control={control} />
            </form>
        </>
    )
}
export default CompanyAdvisory
