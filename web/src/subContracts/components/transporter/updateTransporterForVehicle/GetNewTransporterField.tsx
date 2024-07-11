import { ChangeEvent, FC } from 'react'
import { transporterProps } from './types'
import AutoComplete from '../../../../form/AutoComplete'

export const GetNewTransporterField: FC<transporterProps> = ({
    control,
    transporterList,
    setNewTranporterId
}) => {
    const onChange = (_e: ChangeEvent<HTMLInputElement>, newValue: string) => {
        const transporter = transporterList.filter((transporter) => transporter.name === newValue)
        setNewTranporterId(transporter[0].id)
    }
    return (
        <AutoComplete
            control={control}
            fieldName="newTransporter"
            label="Select New Transporter"
            options={transporterList.map(({ name }) => name)}
            onChange={onChange}
        />
    )
}
