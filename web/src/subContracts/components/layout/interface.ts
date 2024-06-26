import { ReactElement } from 'react'

export interface DrawerListItemProps {
    text: string
    drawerState: boolean
    index: number
    icon: ReactElement
    subs: subsProps[]
}
export interface subsProps {
    navigate: string
    name: string
    icon: string
}
