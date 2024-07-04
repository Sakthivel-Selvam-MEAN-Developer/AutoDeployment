import { formFieldDisplay } from './tripType'
import { Control, FieldValues, SubmitErrorHandler, SubmitHandler } from 'react-hook-form'
import { cementCompanyProps } from './tableList'

export function submitEvent(
    handleSubmit: {
        (
            onValid: SubmitHandler<FieldValues>,
            onInvalid?: SubmitErrorHandler<FieldValues> | undefined
        ): (e?: React.BaseSyntheticEvent<object> | undefined) => Promise<void>
        (arg0: () => Promise<void>): React.FormEventHandler<HTMLFormElement> | undefined
    },
    onSubmit: () => Promise<void>,
    control: Control,
    cementCompany: cementCompanyProps[],
    setCementCompany: React.Dispatch<React.SetStateAction<cementCompanyProps[]>>
) {
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {formFieldDisplay(control, cementCompany, setCementCompany)}
        </form>
    )
}
