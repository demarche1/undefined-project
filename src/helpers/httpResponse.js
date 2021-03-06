const ServerError = require("./errors/server-error");
const UnauthorizedError = require("./errors/unauthorized-error");

module.exports = class HttpResponse {
  static BadRequest(error) {
    return {
      status: 400,
      body: error,
    };
  }

  static Forbbiden() {
    return {
      status: 403,
      body: new ServerError(),
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

  static HandleError(error) {
    console.log(error);
    switch (error.name) {
      case "MissingParamError":
        return HttpResponse.BadRequest(error);

      case "InvalidParamError":
        return HttpResponse.BadRequest(error);

      case "UnauthorizedError":
        return HttpResponse.Unauthorized();

      case "RegistredError":
        return HttpResponse.Ok({ message: error.message });

      default:
        return HttpResponse.InternalServerError();
    }
  }
};
