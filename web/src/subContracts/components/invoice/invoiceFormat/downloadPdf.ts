import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export const downloadPdf = async (
    invoiceData: HTMLElement | null,
    annexureData: HTMLElement | null,
    orientation: 'p' | 'portrait' | 'l' | 'landscape' | undefined,
    unit: 'pt' | 'px' | 'in' | 'mm' | 'cm' | 'ex' | 'em' | 'pc' | undefined,
    format: string | number[],
    company: string
) => {
    if (invoiceData !== null) {
        const invoiceImgData = await html2canvas(invoiceData).then((canvas) =>
            canvas.toDataURL('image/png')
        )

        const pdf = new jsPDF(orientation, unit, format)
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()

        pdf.addImage(invoiceImgData, 'png', 0, 0, pdfWidth, pdfHeight)

        if (annexureData !== null) {
            const annexureImgData = await html2canvas(annexureData).then((canvas) =>
                canvas.toDataURL('image/png')
            )
            pdf.addPage()
            pdf.addImage(annexureImgData, 'png', 0, 0, pdfWidth, pdfHeight)
        }

        pdf.save(`Invoice-${company}.pdf`)
    }
}
