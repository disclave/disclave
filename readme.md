# Disclave

## How to run locally

### Configuration files

To run the project locally, you will need to add some `.env*` files with the correct configuration.

#### Website 
Running website requires `.env.local` file in `./website/` folder. The file should look like this:
```
DOMAIN=http://localhost:3000
FIREBASE_CERT={"type":"TYPE", ...other values}
FIREBASE_CLIENT_CONFIG={"apiKey":"API_KEY","authDomain":"AUTH_DOMAIN","projectId":"PROJECT_ID","appId":"APP_ID","measurementId":"MEASUREMENT_ID"}
DB_URI=MONGO_DB_URI
DB_NAME=MONGO_DB_NAME
```
**Those are mocked values (except localhost domain) - replace them with correct values from the Firebase and Mongo!!!**

#### Chrome extension
It requires `.env.local` and `.env.production` files in `./chrome-extension` folder. The first one is used for `build:dev` script, and the second one for `build` script. Each file should contain two values:
```
FIREBASE_CLIENT_CONFIG={"apiKey":"API_KEY","authDomain":"AUTH_DOMAIN","projectId":"PROJECT_ID","appId":"APP_ID","measurementId":"MEASUREMENT_ID"}
API_URL=http://localhost:3000/api/graphql
```
The first one is the same as the firebase client config for the website. The second one is GraphQL API url.

#### React plugin
It requires a single `.env` file in `./chrome-extension` folder. It should contain one value:
```
IFRAME_URL=https://disclave.com/website/{{url}}/iframe
```
You can change the domain to localhost, to test changes with a local website.

### Building project

Install all dependencies (if you dont have yarn, install it with `npm install -g yarn`):
```
yarn install
```
Bootstrap project:
```
yarn bootstrap
```
Build everything:
```
yarn build
```
If you don't want to build everything, you can run `yarn build` individually in each folder.

### Run project

To run website, go to the `./website` folder and run `yarn dev`. After that, website should be running on `http://localhost:3000/`
