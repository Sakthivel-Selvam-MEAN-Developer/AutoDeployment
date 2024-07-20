// import { PostgresMock } from "pgmock";
import { PrismaPGlite } from 'pglite-prisma-adapter'
import { PGlite } from '@electric-sql/pglite'

export const initDb = async () => {
    const client = new PGlite()
    const adapter = new PrismaPGlite(client)
    // const mock = await PostgresMock.create();
    // const connectionString = await mock.listen(port);
    // return { connectionString, destroy: () => mock.destroy(), pgConfig: mock.getNodePostgresConfig() }
    return { adapter, client }
}
