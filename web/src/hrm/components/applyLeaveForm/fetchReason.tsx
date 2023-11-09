import FormControl from "@mui/material/FormControl"
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { useEffect, useState } from "react"
import { getAllLeaveReasons } from "../../services/leaveReasons"

type FetchReasonProps = {
    reason: string;
    setReason: any;
}

const FetchReason: React.FC<FetchReasonProps> = ({ reason, setReason }) => {
    const [fetchReason, setFetchReason] = useState<any>([])


    useEffect(() => {
        // @ts-ignore
        getAllLeaveReasons().then(setFetchReason)
    }, [])

    const handleChange = (event: SelectChangeEvent) => {
        setReason(event.target.value as string);
    }

    return (
        <>
            <FormControl sx={{ minWidth: 200 }} size="medium">
                <InputLabel id="demo-simple-select-helper-label">
                    Reasons
                </InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Reasons"
                    value={reason}
                    onChange={handleChange}
                >
                    {fetchReason.map((reason: any, index: any) => (
                        <MenuItem key={index} value={reason.id}>
                            {reason.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    )
}
export default FetchReason