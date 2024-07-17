import { useEffect, useState } from 'react'
import { getAllpricePoint } from '../../../services/pricePoint'
import ListAllPricePoint from './pricePointReportShow'

const PricePointReport: React.FC = () => {
    const [listPricePoint, setListPricePoint] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getAllpricePoint()
            .then(setListPricePoint)
            .then(() => setLoading(false))
    }, [])
    return <ListAllPricePoint allPricePoint={listPricePoint} loading={loading} />
}
export default PricePointReport
