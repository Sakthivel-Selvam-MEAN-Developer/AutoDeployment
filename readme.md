## Available Scripts

machine setup

```bash
# install brew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"

# check brew is installed. Open a new terminal
brew -v

# install colima and node
brew install colima node

# enable yarn
corepack enable
yarn init -2

```

as you start the day
```bash
# get the latest code
git pull
# dependency install
yarn install
# start the db
yarn db
# do db setup
yarn b pris
# start the keycloack
yarn key
# setup keycloak
yarn keySetup
# start ui
yarn u dev
# start backend
yarn b dev
```


In the project directory, you can run:

```bash
yarn
```

Will install all Devdependencies and Dependencies.

```bash
yarn ui
```

Runs the app in the development mode.\
Open [http://localhost:3002](http://localhost:3002) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

```bash
yarn test
```

Will Launch the jest unit-Testing.
Launches the test runner in the interactive watch mode.\

```bash
yarn run build
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
