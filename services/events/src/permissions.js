const { rule, shield, allow } = require("graphql-shield");

const isAuthenticated = rule({ cache: 'strict'})((parent, args, { user }) => {
  return user !== null;
});

const canReadAnyAccount = rule({ cache: 'contextual'})((parent, args, { user }) => {
  console.log("hola")
  return 
});

const permissions = shield({
  Query: {
    me: isAuthenticated,
    loginUser: allow
  }
});

module.exports = { permissions };