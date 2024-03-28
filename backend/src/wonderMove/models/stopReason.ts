import { Prisma } from '@prisma/client'
import prisma from '../../../prisma/index.ts'

export const YetToBeIdentifiedReason: string = 'Yet to be identified'

export const getDefaultReason = () =>
    prisma.stopReasons.findUnique({ where: { name: YetToBeIdentifiedReason } })

export const create = (
    data: Prisma.stopReasonsCreateInput | Prisma.stopReasonsUncheckedCreateInput
) => prisma.stopReasons.create({ data })
interface dataProps {
    id: number
    name: string
}
export const update = (data: dataProps) =>
    prisma.stopReasons.update({
        where: {
            id: data.id
        },
        data: {
            name: data.name
        }
    })

export const getAllReason = () =>
    prisma.stopReasons.findMany({
        select: {
            id: true,
            name: true
        }
    })
