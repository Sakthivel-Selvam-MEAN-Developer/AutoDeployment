import { render, screen } from '@testing-library/react'
import TextInput from './TextInput.tsx'
import { TestForm } from './TestForm.tsx'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { Control } from 'react-hook-form'

describe('TextInput', () => {
    let control: Control
    it('renders headline', async () => {
        render(
            <TestForm>
                <TextInput control={control} fieldName="userName" label="UserName" />
            </TestForm>
        )

        await userEvent.type(screen.getByLabelText('UserName'), 'hi buddy')

        expect(screen.getByLabelText('UserName')).toBeVisible()
    })
})
