// import { PGlite } from '@electric-sql/pglite'
// import { join } from 'path'
// import { readdir, readFile, stat } from 'fs/promises'

// export const client = new PGlite()
// async function getSqlFiles(dir: string): Promise<string[]> {
//     let files: string[] = []
//     const items = await readdir(dir)
//     for (const item of items) {
//         const fullPath = join(dir, item)
//         const itemStat = await stat(fullPath)
//         if (itemStat.isDirectory()) {
//             const nestedFiles = await getSqlFiles(fullPath)
//             files = files.concat(nestedFiles)
//         } else if (itemStat.isFile() && fullPath.endsWith('.sql')) {
//             files.push(fullPath)
//         }
//     }
//     return files
// }
// export const applyMigrations = async (client: any) => {
//     const migrationDir = '/Users/barath/Desktop/wonderWhy/backend/prisma/migrations/'
//     const sqlFiles = await getSqlFiles(migrationDir)
//     try {
//         for (const file of sqlFiles) {
//             const migration = await readFile(file, 'utf8')
//             console.log(file)
//             await client.exec(migration)
//         }
//     } catch (e) {
//         console.log('error', e)
//     }
// }
