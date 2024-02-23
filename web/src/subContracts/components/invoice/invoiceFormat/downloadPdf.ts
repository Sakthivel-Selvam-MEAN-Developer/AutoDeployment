import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export const downloadPdf = async (
    data: HTMLElement | null,
    orientation: 'p' | 'portrait' | 'l' | 'landscape' | undefined,
    unit: 'pt' | 'px' | 'in' | 'mm' | 'cm' | 'ex' | 'em' | 'pc' | undefined,
    format: string | number[],
    company: string
) => {
    if (data !== null)
        await html2canvas(data).then((canvas) => {
            const imgData = canvas.toDataURL('image/png')
            const pdf = new jsPDF(orientation, unit, format)
            const pdfWidth = pdf.internal.pageSize.getWidth()
            const pdfHeight = pdf.internal.pageSize.getHeight()
            pdf.addImage(imgData, 'png', 0, 0, pdfWidth, pdfHeight)
            pdf.save(`Invoice-${company}.pdf`)
        })
}
