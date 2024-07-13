// import { applyMigrations, client } from '../../expTest.ts'
import cleanData from './cleanDb.ts'

// await applyMigrations(client)
beforeEach(async () => {
    await cleanData()
})

afterAll(async () => {
    await cleanData()
})
