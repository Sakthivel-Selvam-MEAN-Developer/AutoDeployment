import { Button } from '@mui/material'
interface ActionButtonParams {
    onClick: () => void
    displayText: string
}

export const ActionButton = (props: ActionButtonParams) => (
    <div
        style={{
            marginBottom: '30px',
            display: 'flex',
            justifyContent: 'right'
        }}
    >
        <Button color="primary" variant="contained" onClick={() => props.onClick()}>
            {props.displayText}
        </Button>
    </div>
)
