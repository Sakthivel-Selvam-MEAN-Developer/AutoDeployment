## Approval Hierarchy

```mermaid
flowchart TD
    A[MD] --> B(Directors)
    B --> C(Project Head)
    C --> D(Site Head)
    B --> E(Department Head)
    D --> |Site| F[Site staff]
    E --> |Office| G[Office Staff]
```

[//]: #
[//]: # '```mermaid'
[//]: # 'flowchart TD'
[//]: # '    A[MD] --> B(Department Heads)'
[//]: # '    C[Cost Centers offices/ sites] --> D(Site Heads)'
[//]: # '    '
[//]: # '%%    B --> C(Project Head)'
[//]: # '%%    C --> D(Site Head)'
[//]: # '%%    B --> E(Department Head)'
[//]: # '%%    D --> |Site| F[Site staff]'
[//]: # '%%    E --> |Office| G[Office Staff]'
[//]: # '```'

## Assumptions

-   Leave can be applied in
    -   full day
    -   half day
    -   and hours. Monthly 4 hours (max)
-   Every person can be mapped to a site and/or department and/or office
    -   should we build restrictions like a
        -   person can either be part of a site or office
        -   person should be part of only one site
        -   person should be part of only one department
-   For each person we can define 1 or 2 approvers
-   This assignment of leave is done by HR team
-   We will give bulk update feature for HR to assign approvers
    -   ex. To assign approvers of all persons in site-1 working in purchase, HR will be able to filter and assign approvers in bulk
-   There can be multiple types of leaves. Each leave type will have following defined
    -   Documents
    -   Overall Allowed Limit per month (do we need per year limit)

| Type                | Apply Before / After | Documents          | Overall Allowed Limit | Per. Apply Limit |
| ------------------- | -------------------- | ------------------ | --------------------- | ---------------- |
| Sick                | After                | Doctor Certificate | ?                     | ?                |
| Emergency Leave     | After                | ?                  | ?                     | ?                |
| functions           | Before               | Invitation         | ?                     | ?                |
| festivals           | before               | ?                  | ?                     | ?                |
| Personal Work       | Before               | ?                  | ?                     | ?                |
| Educational purpose | Before               | ?                  | ?                     | ?                |
| Emergency Leave     | Before               | ?                  | ?                     | ?                |
| Maternity           | Before               | ?                  | ?                     | ?                |
| Paternity           | Before               | ?                  | ?                     | ?                |

## Users

1. Leave applier (who applied for leave)
2. Leave Approver (who approves or rejects)
3. HR

## Screens

### Leave Applier

-   Leave apply form
-   Leave list/summary
-   Leave details

### Leave Approver

-   List pending approvals
-   List approved/rejected
-   Summary of applied/approved/rejected - By date
-   Approval Screen

### HR

-   Monthly report per person, for salary computation

## Phases

1. Basic leave application with approval/reject flow
2. Summary before approval/reject
3. Apply rules of per leave limit and overall limit
