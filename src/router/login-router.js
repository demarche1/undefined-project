const HttpResponse = require("../helpers/httpResponse");

module.exports = class LoginRouter {
  constructor(authService) {
    this.authService = authService;
  }
  async route(httpResquest) {
    try {
      const { email, password } = httpResquest.body;

      if (!email) {
        return HttpResponse.BadRequest("email");
      }

      if (!password) {
        return HttpResponse.BadRequest("password");
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
