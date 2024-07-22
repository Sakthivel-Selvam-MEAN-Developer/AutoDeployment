import { PrismaPGlite } from 'pglite-prisma-adapter'
import { PGlite } from '@electric-sql/pglite'

export const initDb = async () => {
    const client = new PGlite()
    const adapter = new PrismaPGlite(client)
    return { adapter, client }
}
