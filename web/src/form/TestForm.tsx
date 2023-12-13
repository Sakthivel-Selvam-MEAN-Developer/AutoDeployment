import { Control, FieldValues, useForm } from 'react-hook-form'
import React from 'react'

const addProps = (element: React.ReactElement, control: Control) =>
    React.cloneElement(element, { control })

export const TestForm = ({ children }: { children: React.ReactElement }) => {
    const { handleSubmit, control } = useForm<FieldValues>()
    const childWithControl = addProps(children, control)
    return (
        <>
            <form onSubmit={handleSubmit(() => {})}>{childWithControl}</form>
        </>
    )
}
