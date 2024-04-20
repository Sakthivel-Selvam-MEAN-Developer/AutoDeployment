echo "Waiting for keycloak to start..."
FAILED=0
TIMES=0
/opt/keycloak/bin/kcadm.sh config credentials  --server http://localhost:8080 --realm master --user $KEYCLOAK_ADMIN --password $KEYCLOAK_ADMIN_PASSWORD``
while [ $? -ne 0 ]
do
  if [ $TIMES -ge 60 ]; then
    echo "Keycloak did not start within 5 minutes. Exiting..."
    FAILED=1
  fi
  sleep 5
  TIMES=$((TIMES+1))
  echo "Waiting for keycloak to start..."
  /opt/keycloak/bin/kcadm.sh config credentials  --server http://localhost:8080 --realm master --user $KEYCLOAK_ADMIN --password $KEYCLOAK_ADMIN_PASSWORD
done

if [ $FAILED -eq 1 ]; then
  exit 1
fi

echo "Keycloak is up and running"

echo "create user"
/opt/keycloak/bin/kcadm.sh  create users -r WonderWhy -s username=local -s enabled=true
/opt/keycloak/bin/kcadm.sh  set-password -r WonderWhy --username local --new-password local
echo "created user, successfully"
echo "adding user to role"
/opt/keycloak/bin/kcadm.sh  add-roles --uusername local --rolename SuperAdmin -r WonderWhy

exit 0
