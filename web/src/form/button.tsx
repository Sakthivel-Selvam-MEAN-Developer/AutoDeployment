import { FC } from 'react'
import { Button } from '@mui/material'

interface ButtonProps {
    name: string
    type: 'submit' | 'reset' | 'button'
    disabled?: boolean
}
const style = {
    display: 'flex',
    justifyContent: 'center'
}
const SubmitButton: FC<ButtonProps> = ({ name, type, disabled }) => {
    return (
        <div style={style}>
            <Button
                color="secondary"
                variant="contained"
                type={type}
                style={{ marginTop: '20px' }}
                disabled={disabled}
            >
                {name}
            </Button>
        </div>
    )
}

SubmitButton.defaultProps = {
    disabled: false
}

export default SubmitButton
