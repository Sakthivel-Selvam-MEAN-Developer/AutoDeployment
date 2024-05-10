import { BaseSyntheticEvent, ReactElement } from 'react'
import { Control } from 'react-hook-form'

export interface successType {
    openSuccessDialog: boolean
    setOpenSuccessDialog: React.Dispatch<React.SetStateAction<boolean>>
}
export type DriverType = (
    onSubmit: (e?: BaseSyntheticEvent<object, object, object> | undefined) => Promise<void>,
    control: Control,
    openSuccessDialog: boolean,
    setOpenSuccessDialog: React.Dispatch<React.SetStateAction<boolean>>
) => ReactElement
