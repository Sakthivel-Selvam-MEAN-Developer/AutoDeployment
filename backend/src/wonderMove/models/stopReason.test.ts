import seedReason from '../seed/reason.ts'
import {
    create,
    getAllReason,
    getDefaultReason,
    update,
    YetToBeIdentifiedReason
} from './stopReason.ts'

describe('Reason model', () => {
    test('should able to access', async () => {
        await create(seedReason)
        const actual = await getAllReason()
        expect(actual.length).toBe(1)
        expect(actual[0].name).toBe(seedReason.name)
    })
    test('should get default reason', async () => {
        await create({ name: YetToBeIdentifiedReason })
        await create({ name: 'Break Down' })
        await create({ name: 'Puncture' })
        const actual = await getDefaultReason()
        expect(actual!.name).toBe(YetToBeIdentifiedReason)
    })
    test('should update reason', async () => {
        const newReason = await create({ name: 'Puncture' })
        const actual = await update({ id: newReason.id, name: 'Break Down' })
        expect(actual.id).toBe(newReason.id)
        expect(actual.name).toBe('Break Down')
    })
})
