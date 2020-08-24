const express = require('express')
const expressJwt = require("express-jwt");

const app = new express()

app.use(
  expressJwt({
    secret: "f1BtnWgD3VKY",
    algorithms: ["HS256"],
    credentialsRequired: false
  })
);

module.exports = {
  app
}