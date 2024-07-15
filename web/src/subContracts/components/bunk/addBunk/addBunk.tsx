import { Button } from '@mui/material'
import FormFields from './formFields'
import { useForm } from 'react-hook-form'
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
interface bunkProp {
    setReCall: React.Dispatch<React.SetStateAction<boolean>>
    reCall: boolean
}
const AddBunk: FC<bunkProp> = ({ setReCall, reCall }) => {
    const { control, handleSubmit, setValue } = useForm()
    const [accTypeNumber, setAccTypeNumber] = useState<number>(0)
    const [openDialog, setOpenDialog] = useState<boolean>(false)
    return (
        <>
            <Header />
            <form
                onSubmit={handleSubmit((data) =>
                    onSubmit(data, accTypeNumber, setOpenDialog, setReCall, reCall)
                )}
            >
                <FormFields
                    control={control}
                    setAccType={setAccTypeNumber}
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
