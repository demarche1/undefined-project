const InvalidParamError = require("./invalidParam-error");

module.exports = class ErrorDispatcher {
  static dispatch(errors) {
    if (!errors) {
      throw new InvalidParamError("errors");
    }

    if (errors.length > 0) {
      for (const error of errors) {
        throw error;
      }
    }
  }
};
