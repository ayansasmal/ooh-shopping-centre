# OOH Shopping Centre Management APIs

This is a Node.js Application providing APIs to manage Shopping Centre and Assets. This app uses in-memory MongoDB to store data.

## Roles for accessing app

### Role for Admin
app-admin : Admin for the APIs

### Roles for Managing Assets
assets-read : Permission to read Assets. 

assets-add : Permission to add Assets. 

assets-update : Permission to update Assets. 

assets-delete : Permission to delete Assets. 


### Roles for Managing Shopping Centre
shopping-centre-read : Permission to read data of Shopping Centres. 

shopping-centre-add : Permission to add Shopping Centres. 

shopping-centre-update : Permission to update data of Shopping Centres. 

shopping-centre-delete : Permission to delete Shopping Centres. 

shopping-centre-read-assets : Permission to read assets of shopping centres. 

shopping-centre-add-assets : Permission to add assets to shopping centres. 

shopping-centre-remove-assets : Permission to remove assests from shopping centres. 

## Installation

Use the npm or yarn to install all node modules.

```bash
npm install
```
OR
```bash
yarn install
```

## Running the app
Development mode
```
npm start
```
Once the server is up please follow the below steps to invoke/test APIs.
1. Access http://localhost:8080/api-doc

2. To check if API is up, **"Try it out"** the healthcheck interface.

3. To login to the Application, **"Try it out"** the login interface.

4. Provide the correct Username and Password in the Request Body for the APIs and hit **Execute**

5. Copy the **authorization** header value from the response if login is successful

6. Go to top of Api-doc, click **Authorize** and paste the **authorization** header value and hit **Authorize**

7. Go to the desired API and initiate the transaction.

8. *Happy managing the shopping centres and assets!!!*

### Initial Data for API
To login use *johndoeadmin* and *ooh@123*. You can create more credentials and roles in scripts.js.

## API OAS 
To get the latest swagger spec, start the app in development mode and open http://localhost:8080/api-doc or http://localhost:8080/swagger.json

## Testing the app
```
npm test
```

