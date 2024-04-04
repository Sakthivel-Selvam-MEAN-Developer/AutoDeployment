import { Button } from '@mui/material'
interface ActionButtonParams {
    onClick: () => void
    displayText: string
}
const style = {
    marginBottom: '30px',
    display: 'flex',
    justifyContent: 'right'
}
export const ActionButton = (props: ActionButtonParams) => (
    <div style={style}>
        <Button color="primary" variant="contained" onClick={() => props.onClick()}>
            {props.displayText}
        </Button>
    </div>
)
