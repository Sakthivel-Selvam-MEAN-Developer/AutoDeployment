import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'
import { useAuth } from 'react-oidc-context'

const style = {
    background: '#1c2b0a',
    color: 'white',
    ':hover': {
        background: '#0e19089e'
    }
}

export const Logout = () => {
    const auth = useAuth()
    return (
        <Typography variant="h6" noWrap component="div">
            <Button sx={style} onClick={() => auth.signoutRedirect()}>
                Logout
            </Button>
        </Typography>
    )
}
