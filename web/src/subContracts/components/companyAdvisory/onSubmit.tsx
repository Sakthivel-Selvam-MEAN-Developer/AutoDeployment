import { FieldValues } from 'react-hook-form'
import { checkAllFields } from '../../../commonUtils/checkAllFields'

export const onSubmit = (data: FieldValues) => {
    if (!checkAllFields(data)) return alert('All Fields are Required')
}
