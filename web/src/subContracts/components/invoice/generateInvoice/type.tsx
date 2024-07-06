export interface dialog {
    load: boolean
    setLoad: React.Dispatch<React.SetStateAction<boolean>>
    pdfStr: string
    update: () => void
}
export interface dialogAction {
    setLoad: React.Dispatch<React.SetStateAction<boolean>>
    update: () => void
}
