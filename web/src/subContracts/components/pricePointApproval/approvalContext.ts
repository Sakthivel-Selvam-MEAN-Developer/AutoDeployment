import { createContext } from 'react'

interface submitStatusContextProps {
    submitStatus: boolean
    setSubmitStatus: React.Dispatch<React.SetStateAction<boolean>>
}
export const submitStatusContext = createContext<submitStatusContextProps>(
    {} as submitStatusContextProps
)
