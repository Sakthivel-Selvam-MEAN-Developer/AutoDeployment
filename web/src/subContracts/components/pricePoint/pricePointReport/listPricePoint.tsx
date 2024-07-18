import { useEffect, useState } from 'react'
import { getAllpricePoint } from '../../../services/pricePoint'
import ListAllPricePoint from './pricePointReportShow'
interface displayProps {
    displayData: boolean
}
const PricePointReport: React.FC<displayProps> = ({ displayData }) => {
    const [listPricePoint, setListPricePoint] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getAllpricePoint()
            .then(setListPricePoint)
            .then(() => setLoading(false))
    }, [displayData])
    return <ListAllPricePoint allPricePoint={listPricePoint} loading={loading} />
}
export default PricePointReport
