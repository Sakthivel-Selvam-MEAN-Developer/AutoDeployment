import { UseFormSetValue, FieldValues } from 'react-hook-form'

export const clearFields = (setValue: UseFormSetValue<FieldValues>, data: FieldValues) => {
    Object.entries(data).forEach(([key, value]) => {
        if (typeof value === 'object') setValue(`${key}`, null)
        else setValue(`${key}`, '')
    })
}
