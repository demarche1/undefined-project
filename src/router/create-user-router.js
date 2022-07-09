const HttpResponse = require("../helpers/httpResponse");
const { MissingParamError, InvalidParamError } = require("../helpers/errors");

module.exports = class CreateUserRouter {
  constructor(createUserService) {
    this.createUserService = createUserService;
  }
  async route(httpResquest) {
    try {
      const { name, age, email, password, confirmPassword, city, zip_code } =
        httpResquest.body;

      if (!name) {
        return HttpResponse.BadRequest(new MissingParamError("name"));
      }

      if (!age) {
        return HttpResponse.BadRequest(new MissingParamError("age"));
      }

      if (!email) {
        return HttpResponse.BadRequest(new MissingParamError("email"));
      }

      if (!password) {
        return HttpResponse.BadRequest(new MissingParamError("password"));
      }

      if (!confirmPassword) {
        return HttpResponse.BadRequest(
          new MissingParamError("confirmPassword")
        );
      }

      if (!city) {
        return HttpResponse.BadRequest(new MissingParamError("city"));
      }

      if (!zip_code) {
        return HttpResponse.BadRequest(new MissingParamError("zip_code"));
      }

      if (password !== confirmPassword) {
        return HttpResponse.BadRequest(
          new InvalidParamError("confirmPassword")
        );
      }

      const userId = await this.createUserService.create({
        name,
        age,
        email,
        password,
        confirmPassword,
        city,
        zip_code,
      });

      return HttpResponse.Ok({ userId });
    } catch (error) {
      return HttpResponse.InternalServerError();
    }
  }
};
