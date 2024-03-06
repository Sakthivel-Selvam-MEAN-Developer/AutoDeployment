import dayjs from 'dayjs'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export const downloadPdf = async (
    invoiceData: HTMLElement | null,
    annexureData: HTMLElement | null,
    company: string
) => {
    if (company !== 'UltraTech Cements') {
        if (invoiceData !== null) {
            const invoiceImgData = await html2canvas(invoiceData).then((canvas) =>
                canvas.toDataURL('image/png')
            )
            const mergedPDF = new jsPDF()
            const invoicePdf = new jsPDF('portrait', 'mm')
            const invoicePdfWidth = invoicePdf.internal.pageSize.getWidth()
            const invoicePdfHeight = invoicePdf.internal.pageSize.getHeight()
            mergedPDF.addImage(invoiceImgData, 'png', 0, 0, invoicePdfWidth, invoicePdfHeight)

            if (annexureData !== null) {
                const annexureImgData = await html2canvas(annexureData).then((canvas) =>
                    canvas.toDataURL('image/png')
                )
                const annexurePdf = new jsPDF('landscape', 'mm')
                const annexurePdfWidth = annexurePdf.internal.pageSize.getWidth()
                const annexurePdfHeight = annexurePdf.internal.pageSize.getHeight()
                mergedPDF.addPage('a4', 'landscape')
                mergedPDF.addImage(
                    annexureImgData,
                    'png',
                    0,
                    0,
                    annexurePdfWidth,
                    annexurePdfHeight
                )
            }
            mergedPDF.save(`Invoice_${company}_${dayjs().format('DD_MM_YYYY')}.pdf`)
        }
    } else if (invoiceData)
        downloadPdfForUltraTech(invoiceData, 'landscape', 'mm', [1500, 1300], company)
}

const downloadPdfForUltraTech = async (
    invoice: HTMLElement,
    orientation: 'p' | 'portrait' | 'l' | 'landscape' | undefined,
    unit: 'pt' | 'px' | 'in' | 'mm' | 'cm' | 'ex' | 'em' | 'pc' | undefined,
    format: number[],
    company: string
) =>
    await html2canvas(invoice).then((canvas) => {
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF(orientation, unit, format)
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()
        pdf.addImage(imgData, 'png', 0, 0, pdfWidth, pdfHeight)
        pdf.save(`Invoice_${company}_${dayjs().format('DD_MM_YYYY')}.pdf`)
    })
