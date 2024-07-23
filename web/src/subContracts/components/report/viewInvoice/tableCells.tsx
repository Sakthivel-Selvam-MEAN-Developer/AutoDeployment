import PDFDialog from './pdfDialog'
export function closeDialogBox(
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setPdfLink: React.Dispatch<React.SetStateAction<string | null>>
) {
    return () => {
        setDialogOpen(false)
        setPdfLink(null)
    }
}
export function openDialogBox(
    setPdfLink: React.Dispatch<React.SetStateAction<string | null>>,
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
) {
    return (link: string) => {
        setPdfLink(link)
        setDialogOpen(true)
    }
}
export function pdfBox(dialogOpen: boolean, handleCloseDialog: () => void, pdfLink: string | null) {
    return <PDFDialog open={dialogOpen} onClose={handleCloseDialog} pdfLink={pdfLink!} />
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function link(handleOpenDialog: (link: string) => void, params: any) {
    return (
        <a href="#" onClick={() => handleOpenDialog(params.value)}>
            View PDF
        </a>
    )
}
