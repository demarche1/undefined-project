const HttpResponse = require("../helpers/httpResponse");

module.exports = class CreateUserRouter {
  constructor(createUserService) {
    this.createUserService = createUserService;
  }
  async route(httpResquest) {
    try {
      const { name, age, email, password, confirmPassword, city, zip_code } =
        httpResquest.body;

      if (!name) {
        return HttpResponse.BadRequest("name");
      }

      if (!age) {
        return HttpResponse.BadRequest("age");
      }

      if (!email) {
        return HttpResponse.BadRequest("email");
      }

      if (!password) {
        return HttpResponse.BadRequest("password");
      }

      if (!confirmPassword) {
        return HttpResponse.BadRequest("confirmPassword");
      }

      if (!city) {
        return HttpResponse.BadRequest("city");
      }

      if (!zip_code) {
        return HttpResponse.BadRequest("zip_code");
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
