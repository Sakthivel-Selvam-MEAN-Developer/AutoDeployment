import reason from './reason.ts'
import employees from './employees.ts'

export default {
    appliedBy: 'raja',
    appliedOn: new Date(2023, 9, 2).getTime() / 1000,
    from: new Date(2023, 10, 2).getTime() / 1000,
    to: new Date(2023, 10, 12).getTime() / 1000,
    isToHalfDay: true,
    isFromHalfDay: false,
    comments: 'No comments',
    employees: {
        create: employees
    },
    leaveReason: {
        create: reason
    }
}
