const HttpResponse = require("../helpers/httpResponse");

module.exports = class UserController {
  constructor(userService) {
    this.userService = userService;
  }
  async create(httpResquest) {
    try {
      const { name, age, email, password, confirmPassword, city, zip_code } =
        httpResquest.body;

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
      return HttpResponse.HandleError(error);
    }
  }

  async show(httpResquest) {
    try {
      const { id } = httpResquest.params;
      const user = await this.userService.show(id);

      return HttpResponse.Ok({ user });
    } catch (error) {
      return HttpResponse.HandleError(error);
    }
  }

  async update(httpResquest) {
    try {
      const { name, age, email, city, zip_code } = httpResquest.body;
      const { id } = httpResquest.params;

      await this.userService.update({
        id,
        name,
        age,
        email,
        city,
        zip_code,
      });

      return HttpResponse.Ok({ message: "Success" });
    } catch (error) {
      return HttpResponse.HandleError(error);
    }
  }
};
