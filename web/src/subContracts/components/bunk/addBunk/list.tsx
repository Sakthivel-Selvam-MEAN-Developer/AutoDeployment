import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import FormFields from './formFields'
import { useForm } from 'react-hook-form'
import { onSubmit } from './onSubmit'
import { useState } from 'react'
const Header: React.FC = () => (
    <div style={style}>
        Bunk
        <Link to={'/sub/bunk/fuel'}>
            <Button color="primary" variant="contained" data-testid={'new-trip-button'}>
                Add Fuel
            </Button>
        </Link>
    </div>
)
const style = {
    marginBottom: '30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
}
const SubmitButton = () => {
    return (
        <Button variant="contained" type="submit" style={{ margin: '20px 0' }}>
            Create Bunk
        </Button>
    )
}
const AddBunk = () => {
    const { control, handleSubmit, setValue } = useForm()
    const [accTypeNumber, setAccTypeNumber] = useState<number>(0)
    const [openDialog, setOpenDialog] = useState<boolean>(false)
    return (
        <>
            <Header />
            <form onSubmit={handleSubmit((data) => onSubmit(data, accTypeNumber, setOpenDialog))}>
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
