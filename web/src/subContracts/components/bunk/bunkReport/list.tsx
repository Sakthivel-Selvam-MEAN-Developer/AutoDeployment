import { useEffect, useState } from 'react'
import { getAllBunk } from '../../../services/bunk'
import { accType, bunkDetailsProps } from '../addBunk/types'
import BunkDataGrid from './bunkDataGrid'
import { getAllAccountTypes } from '../../../services/accountType'

const BunkReportList = ({ reCall }: { reCall: boolean }) => {
    const [bunkList, setBunkList] = useState<bunkDetailsProps[]>([])
    const [accTypes, setAccTypes] = useState<accType[]>([])
    useEffect(() => {
        getAllBunk().then(setBunkList)
    }, [reCall])
    useEffect(() => {
        getAllAccountTypes().then(setAccTypes)
    }, [])
    return (
        <>
            <p>Bunk List</p>
            <BunkDataGrid bunkList={bunkList} accTypes={accTypes} />
        </>
    )
}

export default BunkReportList
