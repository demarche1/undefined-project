const HttpResponse = require("../helpers/httpResponse");
const { MissingParamError } = require("../helpers/errors");

module.exports = class LoginRouter {
  constructor(authService) {
    this.authService = authService;
  }
  async route(httpResquest) {
    try {
      const { email, password } = httpResquest.body;

      if (!email) {
        return HttpResponse.BadRequest(new MissingParamError("email"));
      }

      if (!password) {
        return HttpResponse.BadRequest(new MissingParamError("password"));
      }

      const accessToken = await this.authService.auth({ email, password });

      if (!accessToken) {
        return HttpResponse.Unauthorized();
      }

      return HttpResponse.Ok({ accessToken });
    } catch (error) {
      return HttpResponse.InternalServerError();
    }
  }
};
