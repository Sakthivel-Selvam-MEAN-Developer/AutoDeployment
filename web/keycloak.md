## keycloak config

```sh
cd /opt/keycloak/bin

./kcadm.sh config credentials --server http://localhost:8080 --realm master --user admin --password admin

./kcadm.sh create realms -s realm=WonderWhy -f /tmp/realm-export.json

```

