import { create, isEmployeeHeadOfParentOrg } from './orgUnitRelations.ts'
import seedOrgRelation from '../seed/orgUnitRelation.ts'

describe('OrgUnitRelations Model', () => {
    test('should able to access', async () => {
        const orgRelation = await create(seedOrgRelation)
        const abc = await isEmployeeHeadOfParentOrg(orgRelation.parentOrgId)
        expect(abc.length).toBe(1)
        expect(abc[0].childOrgId).toBe(orgRelation.childOrgId)
    })
})
