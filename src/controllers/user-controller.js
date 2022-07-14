const HttpResponse = require("../helpers/httpResponse");
const { InvalidParamError } = require("../helpers/errors");
const Validator = require("../helpers/validator");

module.exports = class UserController {
  constructor(userService) {
    this.userService = userService;
  }
  async create(httpResquest) {
    try {
      const { name, age, email, password, confirmPassword, city, zip_code } =
        httpResquest.body;

      const validator = new Validator();

      const errors = validator
        .isAllParamsProvided()
        .equalsTo("password", "confirmPassword")
        .email()
        .validate({
          name,
          age,
          email,
          password,
          confirmPassword,
          city,
          zip_code,
        });

      if (errors.length > 0) {
        for (const error of errors) {
          return HttpResponse.BadRequest(error);
        }
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
      const validator = new Validator();

      const { id } = httpResquest.params;

      const errors = validator.required().string().validate({ id });

      if (errors.length > 0) {
        for (const error of errors) {
          return HttpResponse.BadRequest(error);
        }
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
      const validator = new Validator();

      const errros = validator
        .isAllParamsProvided()
        .email()
        .validate({ name, age, email, city, zip_code });

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
    } catch (error) {
      return HttpResponse.InternalServerError();
    }
  }
};
