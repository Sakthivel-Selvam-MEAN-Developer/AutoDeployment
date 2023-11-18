## Design Decisions

* we will have multiple services running in same machine and using same database
* each service will have their own DB schema. 
  * each service should interact with their own schema only
  * They should not interact with other services' schema
* there should not be any relation between tables of different services/schemas
* hence, no service will interact with each other through database directly
  * instead they will use only api/queues to communicate with each other

## TODO
* Add linting for schema file to block relation between different schemas
* Add linting for the services code to block direct interaction with other services' schema

```mermaid

```