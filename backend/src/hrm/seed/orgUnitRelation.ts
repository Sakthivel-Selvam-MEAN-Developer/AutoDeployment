import orgUnits from './orgUnits.ts'
import secondOrgUnits from './secondOrgUnits.ts'

export default {
    parentOrg: {
        create: orgUnits
    },
    childOrg: {
        create: secondOrgUnits
    }
}
