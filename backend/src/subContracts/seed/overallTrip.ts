import fuel from './fuel.ts'
import loadingToUnloadingTrip from './loadingToUnloadingTrip.ts'

export default {
    fuel: {
        create: fuel
    },
    loadingPointToUnloadingPointTrip: {
        create: loadingToUnloadingTrip
    }
}
