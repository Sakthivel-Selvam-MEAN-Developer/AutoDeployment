import { downloadPdfForUltraTech } from '../../../invoice/invoiceFormat/downloadPdf'
import * as XLSX from 'xlsx'
import saveAs from 'file-saver'
import dayjs from 'dayjs'
import { updateBillDetails } from '../../../../services/tollPlaza'
import { props } from '../alignTripDetails'
type downloadProps = (
    trips: props['trip'],
    bill: { number: string; date: number },
    setLoad: React.Dispatch<React.SetStateAction<boolean>>,
    setPreDialog: React.Dispatch<React.SetStateAction<boolean>>,
    preDialog: boolean,
    reload: boolean
) => void
export const downloadPDF: downloadProps = async (
    trips,
    bill,
    setLoad,
    setPreDialog,
    preDialog,
    reload
) => {
    const overallTripIds = trips.map((trip) => trip.id)
    await updateBillDetails(overallTripIds, { billNo: bill.number, billDate: bill.date }).then(
        () => {
            const data = document.getElementById('toll-invoice-bill-format') as HTMLElement
            downloadPdfForUltraTech(data, 'l', 'mm', [1500, 1000], 'Toll')
            downlaodExcel()
            setPreDialog(!preDialog)
            setLoad(!reload)
        }
    )
}
const downlaodExcel = () => {
    const annexure = document.getElementById('toll-invoice-format') as HTMLElement
    const referel = document.getElementById('toll-invoice-format-for-own') as HTMLElement
    const worksheetAnnexure = XLSX.utils.table_to_sheet(annexure)
    const worksheetReferel = XLSX.utils.table_to_sheet(referel)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheetAnnexure, 'Annexure')
    XLSX.utils.book_append_sheet(workbook, worksheetReferel, 'Referel')
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
    saveAs(blob, `Toll_Invoice_${dayjs().format('DD_MM_YYYY')}.xlsx`)
}
