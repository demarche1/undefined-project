const HttpResponse = require("../helpers/httpResponse");
const { MissingParamError, InvalidParamError } = require("../helpers/errors");

module.exports = class UserController {
  constructor(userService) {
    this.userService = userService;
  }
  async create(httpResquest) {
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

      const usertedId = await this.userService.create({
        name,
        age,
        email,
        password,
        confirmPassword,
        city,
        zip_code,
      });

      return HttpResponse.Ok({ usertedId });
    } catch (error) {
      return HttpResponse.InternalServerError();
    }
  }

  async show(httpResquest) {
    try {
      const { id } = httpResquest.params;

      if (!id) {
        return HttpResponse.BadRequest(new MissingParamError("id"));
      }

      const user = await this.userService.show(id);

      if (!user) {
        return HttpResponse.BadRequest(new InvalidParamError("id"));
      }

      return HttpResponse.Ok({ user });
    } catch (error) {
      return HttpResponse.InternalServerError();
    }
  }

  async update(httpResquest) {
    try {
      const { name, age, email, city, zip_code } = httpResquest.body;

      if (!name) {
        return HttpResponse.BadRequest(new MissingParamError("name"));
      }

      if (!age) {
        return HttpResponse.BadRequest(new MissingParamError("age"));
      }

      if (!email) {
        return HttpResponse.BadRequest(new MissingParamError("email"));
      }

      if (!city) {
        return HttpResponse.BadRequest(new MissingParamError("city"));
      }

      if (!zip_code) {
        return HttpResponse.BadRequest(new MissingParamError("zip_code"));
      }
      const user = await this.userService.update({
        name,
        age,
        email,
        city,
        zip_code,
      });

      if (!user) {
        return HttpResponse.BadRequest(
          new InvalidParamError("Invalid params provided")
        );
      }

      return HttpResponse.Ok({ message: "Success" });
    } catch (error) {}
  }
};
