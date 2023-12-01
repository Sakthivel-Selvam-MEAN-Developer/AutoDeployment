import { FC } from 'react'
import { Button } from '@mui/material'

interface ButtonProps {
    name: string
    type: 'submit' | 'reset' | 'button'
}

const SubmitButton: FC<ButtonProps> = ({ name, type }) => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            <Button color="secondary" variant="contained" type={type} style={{ marginTop: '20px' }}>
                {name}
            </Button>
        </div>
    )
}

export default SubmitButton
