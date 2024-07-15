import { Button } from '@mui/material'
import FormFields from './formFields'
import { Control, FieldValues, UseFormHandleSubmit, UseFormSetValue } from 'react-hook-form'
import { onSubmit } from './onSubmit'
import { FC, useState } from 'react'
import Header from './header'

const SubmitButton = () => {
    return (
        <Button variant="contained" type="submit" style={{ margin: '20px 0' }}>
            Create Bunk
        </Button>
    )
}
interface prop {
    setReCall: React.Dispatch<React.SetStateAction<boolean>>
    reCall: boolean
    control: Control
    handleSubmit: UseFormHandleSubmit<FieldValues, undefined>
    setValue: UseFormSetValue<FieldValues>
    id: { type: number; id: number }
    setId: React.Dispatch<React.SetStateAction<{ type: number; id: number }>>
}
const AddBunk: FC<prop> = ({ setReCall, reCall, control, handleSubmit, setValue, id, setId }) => {
    const [openDialog, setOpenDialog] = useState<boolean>(false)
    return (
        <>
            <Header />
            <form
                onSubmit={handleSubmit((data: FieldValues) =>
                    onSubmit(data, id.type, setOpenDialog, setReCall, reCall, id.id)
                )}
            >
                <FormFields
                    control={control}
                    setAccType={setId}
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                    setValue={setValue}
                />
                <SubmitButton />
            </form>
        </>
    )
}
export default AddBunk
