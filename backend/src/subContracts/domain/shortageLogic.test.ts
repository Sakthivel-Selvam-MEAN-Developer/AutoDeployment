import { amountCalculation, calculateShortage, shortageAmountCalculation } from './shortageLogic.ts'

describe('Shortage Logics Test', async () => {
    test('should able to calculate shortage amount with approval status - acceptable', async () => {
        const newShortage = {
            filledLoad: 50000,
            unloadedQuantity: 49000,
            approvalStatus: true,
            shortageAmount: 8000
        }
        const oldShortage = {
            filledLoad: 50000,
            unloadedQuantity: 49000,
            approvalStatus: true,
            shortageAmount: 8000
        }
        const actual = await calculateShortage(newShortage, oldShortage)
        expect(actual).toEqual({
            unloadedQuantity: 49000,
            shortageQuantity: 1000,
            approvalStatus: true,
            shortageAmount: 0
        })
    })
    test('should able to calculate shortage amount with approval status - rejectable', async () => {
        const newShortage = {
            filledLoad: 50000,
            unloadedQuantity: 49000,
            approvalStatus: false,
            shortageAmount: 8000
        }
        const oldShortage = {
            filledLoad: 50000,
            unloadedQuantity: 49000,
            approvalStatus: true,
            shortageAmount: 8000
        }
        const actual = await calculateShortage(newShortage, oldShortage)
        expect(actual).toEqual({
            unloadedQuantity: 49000,
            shortageQuantity: 1000,
            approvalStatus: false,
            shortageAmount: 8000
        })
    })
    test('should able to calculate shortage amount with approval status - rejectable but shortage quantity within 100 kgs', async () => {
        const newShortage = {
            filledLoad: 50000,
            unloadedQuantity: 49900,
            approvalStatus: false,
            shortageAmount: 8000
        }
        const oldShortage = {
            filledLoad: 50000,
            unloadedQuantity: 49000,
            approvalStatus: false,
            shortageAmount: 8000
        }
        const actual = await calculateShortage(newShortage, oldShortage)
        expect(actual).toEqual({
            unloadedQuantity: 49900,
            shortageQuantity: 100,
            approvalStatus: false,
            shortageAmount: 0
        })
    })
    test('should calculate amount when filledLoad * 1000 >= unload', () => {
        const result = amountCalculation(50, 49000)
        expect(result).toEqual((50 * 1000 - 49000) * 8)
    })
    test('should return false when filledLoad * 1000 < unload', () => {
        const result = amountCalculation(50, 51000)
        expect(result).toBe(false)
    })
    test('should calculate shortage amount when filledLoad * 1000 - unload > 100', () => {
        const result = shortageAmountCalculation(50, 49000)
        expect(result).toEqual(amountCalculation(50, 49000))
    })
    test('should return false when filledLoad * 1000 - unload <= 100', () => {
        const result = shortageAmountCalculation(50, 49900)
        expect(result).toBe(false)
    })
})
