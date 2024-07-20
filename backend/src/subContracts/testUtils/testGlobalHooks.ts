import { applyMigrations } from '../../expTest.ts'
import { initPrisma } from '../../../prisma/index.ts'
import cleanData from './cleanDb.ts'
import { initDb } from '../inMemoryDb.ts'

beforeAll(async () => {
    await initDb().then(async (data) => {
        await initPrisma(data.adapter)
        await applyMigrations(data.client)
    })
})
beforeEach(async () => {
    await cleanData()
})

afterAll(async () => {
    await cleanData()
})
