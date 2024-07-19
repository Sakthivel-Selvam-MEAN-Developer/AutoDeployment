import { FieldValues } from 'react-hook-form'
import { checkAllFields } from '../../../commonUtils/checkAllFields'

export const onCreate = (data: FieldValues) => {
    if (!checkAllFields(data)) return alert('All Fields are Required')
}
export const onUpdate = (data: FieldValues) => {
    if (!checkAllFields(data)) return alert('All Fields are Required')
}
