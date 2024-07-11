import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import BunkFormFields from './formFields'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

const Header: React.FC = () => (
    <Link to={'/sub/bunk/fuel'}>
        <Button color="primary" variant="contained" data-testid={'new-trip-button'}>
            Add Fuel
        </Button>
    </Link>
)
const style = {
    marginBottom: '30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
}
const AddBunk = () => {
    const { control, handleSubmit } = useForm()
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data)
    }
    return (
        <>
            <div style={style}>
                Bunk
                <Header />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <BunkFormFields control={control} />
                <Button variant="contained" type="submit" style={{ margin: '20px 0' }}>
                    Create Bunk
                </Button>
            </form>
        </>
    )
}
export default AddBunk
