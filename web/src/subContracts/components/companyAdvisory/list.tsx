import { useForm } from 'react-hook-form'
import FormFields from './advisoryFormFields'
import { onCreate, onUpdate } from './onSubmit'
import UpdateFormFields from './updateFormFields'
import SuccessDialog from '../../../commonUtils/SuccessDialog'
import { useState } from 'react'

const CompanyAdvisory = () => {
    const { handleSubmit: handleCreate, control: createControl, setValue: setValueC } = useForm()
    const { handleSubmit: handleUpdate, control: updateControl, setValue: setValueU } = useForm()
    const [open, setOpen] = useState<boolean>(false)
    const [msg, setMsg] = useState<string>('')
    return (
        <>
            <form onSubmit={handleCreate((data) => onCreate(data, setMsg, setOpen, setValueC))}>
                <h4>Add Advisory</h4>
                <FormFields control={createControl} />
            </form>
            <form onSubmit={handleUpdate((data) => onUpdate(data, setMsg, setOpen, setValueU))}>
                <h4 style={{ marginTop: '100px' }}>Update Invocie</h4>
                <UpdateFormFields control={updateControl} />
            </form>
            <SuccessDialog open={open} handleClose={() => setOpen(false)} message={msg} />
        </>
    )
}
export default CompanyAdvisory
