echo "Waiting for keycloak to start..."

NAME=$1
PASSWORD=$2
/opt/keycloak/bin/kcadm.sh config credentials  --server http://localhost:8080 --realm master --user $KEYCLOAK_ADMIN --password $KEYCLOAK_ADMIN_PASSWORD

echo "Keycloak is up and running"

echo "create user"
/opt/keycloak/bin/kcadm.sh  create users -r WonderWhy -s username=$NAME -s enabled=true
/opt/keycloak/bin/kcadm.sh  set-password -r WonderWhy --username $NAME --new-password $PASSWORD
echo "created user, successfully"
echo "adding user to role"
/opt/keycloak/bin/kcadm.sh  add-roles --uusername $NAME --rolename Employee -r WonderWhy

exit 0
