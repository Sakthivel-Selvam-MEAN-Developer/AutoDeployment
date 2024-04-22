Machine setup

# Generate SSH key
Generate SSH key for Github in terminal and set it in your Github account.
Note: SSH keys in GitHub serve as a secure way for users to authenticate their identity without relying on passwords, enabling secure access to repositories for pushing and pulling code.

# Clone the repository
Clone the respository using SSH.

# Get the latest code
`git pull`

# Dependency install
In the project directory, you can run `yarn` command in the terminal.
Note: Running `yarn` commands in the terminal based on the provided package.json file serves various purposes such as setting up development environments, managing dependencies, running tests, building projects, and deploying applications, among other tasks specified in the scripts section of the file.

# Setup the Environmental Variables
Setup the Keycloak environmental variable in terminal using the following command:

` export KEYCLOAK_ADMIN=admin_username
  export KEYCLOAK_ADMIN_PASSWORD=admin_password `

Note: Replace admin_username and admin_password with the desired username and password for the admin user.

# Start the frontend
Run `yarn ui` in frontend directory.
Note: To launch the frontend, execute `yarn ui` in the terminal, leveraging the defined script `ui` which internally runs `yarn workspace web dev`.

# Setup the backend
Run `yarn prismaUp` in backend directory.
Note: Executing `yarn prismaUp` triggers the generation of Prisma client, updating the client library based on the schema changes in the database, ensuring synchronization between the database schema and the TypeScript types used in the backend code.

Run `yarn pris` in backend directory.
Note: Running `yarn pris` typically encompasses a series of Prisma-related commands, including generating the Prisma client, deploying migrations, and potentially other related tasks, ensuring that the database schema and associated code are up-to-date and synchronized for development and testing environments.

Run `yarn seedDevDb` in backend directory.
Note: Executing `yarn seedDevDb` initiates the seeding process for the development database. This command likely triggers a script that populates the development database with initial or sample data, facilitating testing and development processes with realistic data scenarios.

# Start the backend
Run `yarn backend` in backend directory.
Note: Execute `yarn backend` in the terminal to initiate the backend, utilizing the defined script `backend` which internally runs `yarn workspace backend dev`.

# Start the docker
In the project directory, run `docker-compose up` command in the terminal.
Note: This initiates the deployment of Docker containers defined in the `compose.yml` file. This command starts up the services specified in the configuration file, allowing multiple containers to be launched and interconnected as per the defined environment.

# Setup the Keycloak Authentication
visit `localhost:8080` for keycloak configuration.
Note: Navigate to the admin console and create a realm called `WonderWhy` Once created, switch from the "Master" realm to the newly created 'WonderWhy' realm. Then, go to "Realm Settings" and select "Action." Choose "Partial Import" and proceed to browse for the JSON file located in the Keycloak folder, importing it accordingly.

Go to the user section and add a username, then set the password.