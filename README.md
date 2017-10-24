# Description #

This is a boilerplate for a robust yet simplistic REST API Server written for NodeJS. It supports two 
authentication strategies, namely Local Strategy and JWT Strategy.

This boilerplate comes with three routes:
* / - This is a protected route which requires a valid token. It will return a simple object on success.
* /signin - This route uses local strategy to authenticate a username and password. A valid token will be returned.
* /signup - This route creates a new user inside a mongodb collection and returns a valid token.

The following core libraries were used:
* ExpressJS - The http server
* Passport, Passport-JWT, Passport-Local - The authentication libraries to support auth strategies
* Mongoose - To interact with MongoDB
* JWT-Simple - To create the JWT token

# Requirements #

Ensure you have mongodb running before you pursue further. Furthermore, you need to create a config file with the 
application secret. Example config:

```sh
▶ cat server/config.js
// Hold application secrets and config
module.exports = {
  secret: 'this is my little secret!'
}
```

# Installation #

```sh
$ git clone https://github.com/jamesattard/node-rest-api/
$ cd server
$ npm install
$ npm run dev
```
