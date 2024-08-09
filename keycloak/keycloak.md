## bring up keycloak
```bash
export KEYCLOAK_ADMIN=admin
export KEYCLOAK_ADMIN_PASSWORD=admin
docker-compose up keycloak -d
docker-compose exec keycloak  sh -c "/config/waitForKeycloak.sh"
```
these values can be set in ~/.zshrc file also

the keycloak server will start in 8080. use "admin" as username/password to login.

## Updating a realm - Yet to be tested
Don't try this in Production.
To update a realm, export the realm and update the realm-export.json file and then run the following command to update the realm.
```sh
export KEYCLOAK_UPDATE_REALM=true
docker-compose exec keycloak  sh -c "/config/updateRealm.sh"
```

## keycloak config

```sh
cd /opt/keycloak/bin
./kcadm.sh config credentials --server http://localhost:8080 --realm master --user $KEYCLOAK_ADMIN --password $KEYCLOAK_ADMIN_PASSWORD
./kcadm.sh create realms -s realm=WonderWhy -f /tmp/realm-export.json 
```
