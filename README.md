# ChatApp

This project was created for [COMP3133](https://github.com/georgebrowntech).
This app is currently running on [Heroku](http://chat-app-fs.herokuapp.com).

## Creating the .env

Run `touch .env`

Then `echo "PORT=3000" > .env`
Then `echo "DB_URL='mongodb://localhost:27017/chat-app'" >> .env`

## Creating secret key for passwords

To create a secret for passwords:

Run `touch server/private.key`

Then run `echo "YOUR_SECRET" > server/private.key`

## Start mongodb

If running locally, make sure you have mongodb installed.

Run `mongod` in a seperate terminal.

If running off a database host change the url in the `.env` file to the connection string for
your database.

## Run the project

This project compiles with the Angular CLI and runs on port 3000 by default (this can be changed through the .env file).

Run `npm install`

Then run `npm run build`

Finally run `npm run start`

The project should be on `http://localhost:PORT`

## Deploying to your own server

If you want to run this on Heroku or your own server there's one file you have to change.

On `./src/app/services/helper.service.ts` change the constant "api_url" to your domain address.

Also make sure web sockets are enabled.

## Endpoints (Requirements)
Please note usernames and roomnames are case sensitive.

Queries are located in `server/index.js`

GET: `/api/history`
Gets all logs. Fields returned: `username, message, roomName, createdAt`

POST: `/api/roomhistory`, PARAMS: roomname
Gets all logs for a room. Fields returned: `username, message, createdAt`

GET: `/api/eventlog`
Gets all events. Fields returned: `event, roomName, username, createdAt`

GET: `/api/history/user/:username`
Gets all logs for a user. Fields returned: `username, event, message, roomName, createdAt`

GET: `/api/history/:roomName/:username`
Gets all logs for a user inside of a given room. Fields returned: `username, event, message, createdAt`