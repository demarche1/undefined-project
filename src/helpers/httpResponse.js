const ServerError = require("./errors/server-error");
const UnauthorizedError = require("./errors/unauthorized-error");

module.exports = class HttpResponse {
  static BadRequest(error) {
    return {
      status: 400,
      body: error,
    };
  }

  static InternalServerError() {
    return {
      status: 500,
      body: new ServerError(),
    };
  }

  static Unauthorized() {
    return {
      status: 401,
      body: new UnauthorizedError(),
    };
  }

  static Ok(data) {
    return {
      status: 200,
      body: data,
    };
  }
};
