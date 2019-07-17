# GIve Me Pizza server api

This application has been written by following the rules of ES6 and using ES modules.

## Requirements
- mongo database server
- NodeJs v8.12.0 . Application has been locked to this version

## Technologies
### Javascript ES
This application has been written following the rules of Ecma Script v6. Despite of the main features of ES6 has been already implemented for Node,
  eventually we might need some interesting new features that is not part of ES specification or it is not enabled yet in nodejs

### Mongo and mongoose
This application is enabled to make use of mongo no sql database with mongoose as ODM.

### ExpressJs
ExpressJs as a framework to handle http requests. It has been added some middlewares such as cors, body-handlers.
Currently it only support requests with content type header: `application/json`.

## Description
The application requires of environment variables defined in the `.env.example` file. Since we are using dotenv, by copying into `.env` should be enough.
The env file has set by default the server port to `3100` and a local mongo server without credentials

The application runs in the following order:
1. setups the database server
2. Once the database is correct, it starts the server
3. the server starts by starting the endpoints we have defined.
4. Accept requests

The application is organized in this way: 
- Models: Mongoose models and schemas to connect with mongo
- Controllers: Folder with functions that deal with database models and handles the business logic. All files here do not worry about endpoints.
- Routes: Folder with the routes to be added to our main express application. Endpoints are defined here.

The CRUD operations required have been created for pizzas and toppings

In order to run the application in development mode: 
```
npm run start:dev
``` 


## Future updates
- Access Control and Authorization: Permissions neither authentication modules have been added, yet.
  JSON Web tokens could be a good option to authorize requests in this case along with a custom authentication system with username/password or a third party authentication system.
- Security headers: Some headers can improve partially the security in the browsers.
- Logging system: It is important to have a logging manager. So, we can delegate that to winston library.
- Production ready deployment and continuous integration. currently it is working in development mode only with nodemon.
  It would be awesome to setup some scripts to have it working with pm2 and without babel.
  And setup some continuous integration system
- Unit tests: I was not able to setup neither fullfil unit tests for the application. This definitely is a must.

