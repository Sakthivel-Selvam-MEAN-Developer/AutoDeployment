echo "Waiting for keycloak to start..."

# Get the name and password from the command-line arguments
NAME=$1
MOBILE_NUMBER=$2

# Convert NAME to lowercase
NAME_LOWER=$(echo "$NAME" | tr '[:upper:]' '[:lower:]')

# Set up Keycloak credentials
/opt/keycloak/bin/kcadm.sh config credentials --server http://localhost:8080 --realm master --user $KEYCLOAK_ADMIN --password $KEYCLOAK_ADMIN_PASSWORD

echo "Keycloak is up and running"

# Create a new user with the lowercase name
echo "Creating user"
/opt/keycloak/bin/kcadm.sh create users -r WonderWhy -s username=$NAME_LOWER -s enabled=true

# Set the password for the new user
/opt/keycloak/bin/kcadm.sh set-password -r WonderWhy --username $NAME_LOWER --new-password $MOBILE_NUMBER
echo "Created user successfully"

# Add the user to the 'Employee' role
echo "Adding user to role"
/opt/keycloak/bin/kcadm.sh add-roles --uusername $NAME_LOWER --rolename Employee -r WonderWhy

exit 0
