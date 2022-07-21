const UnauthorizedError = require("./unauthorized-error");
const MissingParamError = require("./missingParam-error");
const InvalidParamError = require("./invalidParam-error");
const ServerError = require("./server-error");
const ErrorDispatcher = require("./error-dispatcher");
const RegistredError = require("./registred-error");
module.exports = {
  MissingParamError,
  ServerError,
  UnauthorizedError,
  InvalidParamError,
  ErrorDispatcher,
  RegistredError,
};
