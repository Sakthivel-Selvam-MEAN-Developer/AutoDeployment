import React from 'react'
import { companyConfig } from './companyConfig.ts'
import { InvoiceProp } from './type.tsx'

const calculateTotals = (trips: InvoiceProp['trips']) => {
    let totalFilledLoad = 0
    let totalAmount = 0
    let numberOfTrips = 0
    let fromDate = 0
    let endDate = 0
    let shortageQuantity = 0
    if (trips.loadingPointToStockPointTrip) {
        trips.loadingPointToStockPointTrip.forEach((loadingToStock) => {
            fromDate =
                fromDate === 0
                    ? loadingToStock.startDate
                    : loadingToStock.startDate < fromDate
                      ? loadingToStock.startDate
                      : fromDate
            endDate =
                endDate === 0
                    ? loadingToStock.startDate
                    : loadingToStock.startDate > endDate
                      ? loadingToStock.startDate
                      : endDate
            numberOfTrips += 1
            totalAmount += loadingToStock.freightAmount * loadingToStock.filledLoad
            totalFilledLoad += loadingToStock.filledLoad
            if (loadingToStock.overallTrip[0].shortageQuantity.length > 0) {
                shortageQuantity +=
                    loadingToStock.overallTrip[0].shortageQuantity[0].shortageQuantity
            } else shortageQuantity = 0
        })
    }
    if (trips.loadingPointToUnloadingPointTrip) {
        trips.loadingPointToUnloadingPointTrip.forEach((loadingToUnloading) => {
            fromDate =
                fromDate === 0
                    ? loadingToUnloading.startDate
                    : loadingToUnloading.startDate < fromDate
                      ? loadingToUnloading.startDate
                      : fromDate
            endDate =
                endDate === 0
                    ? loadingToUnloading.startDate
                    : loadingToUnloading.startDate > endDate
                      ? loadingToUnloading.startDate
                      : endDate
            numberOfTrips += 1
            totalAmount += loadingToUnloading.freightAmount * loadingToUnloading.filledLoad
            totalFilledLoad += loadingToUnloading.filledLoad
            if (loadingToUnloading.overallTrip[0].shortageQuantity.length > 0) {
                shortageQuantity +=
                    loadingToUnloading.overallTrip[0].shortageQuantity[0].shortageQuantity
            } else shortageQuantity = 0
        })
    }
    if (trips.stockPointToUnloadingPointTrip) {
        trips.stockPointToUnloadingPointTrip.forEach((stockToUnloading) => {
            fromDate =
                fromDate === 0
                    ? stockToUnloading.startDate
                    : stockToUnloading.startDate < fromDate
                      ? stockToUnloading.startDate
                      : fromDate
            endDate =
                endDate === 0
                    ? stockToUnloading.startDate
                    : stockToUnloading.startDate > endDate
                      ? stockToUnloading.startDate
                      : endDate
            numberOfTrips += 1
            totalAmount +=
                stockToUnloading.freightAmount *
                stockToUnloading.loadingPointToStockPointTrip.filledLoad
            totalFilledLoad += stockToUnloading.loadingPointToStockPointTrip.filledLoad
            if (stockToUnloading.overallTrip[0].shortageQuantity.length > 0) {
                shortageQuantity +=
                    stockToUnloading.overallTrip[0].shortageQuantity[0].shortageQuantity
            } else shortageQuantity = 0
        })
    }
    return { totalAmount, totalFilledLoad, numberOfTrips, fromDate, endDate, shortageQuantity }
}
export default calculateTotals

export const getContentBasedOnCompany = (
    company: string,
    trips: InvoiceProp,
    bill: { billNo: string; date: number },
    depot: string
) => {
    let total = {
        totalAmount: 0,
        totalFilledLoad: 0,
        numberOfTrips: 0,
        fromDate: 0,
        endDate: 0,
        shortageQuantity: 0
    }
    if (trips !== null) total = calculateTotals(trips.trips)
    if (company && companyConfig[company]) {
        const { Component, address } = companyConfig[company]
        return (
            <Component
                trip={trips?.trips}
                address={address}
                bill={bill}
                total={total}
                depot={depot}
            />
        )
    }
    return null
}
