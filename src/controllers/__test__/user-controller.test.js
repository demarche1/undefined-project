const UserController = require("../user-controller");
const {
  MissingParamError,
  InvalidParamError,
  ServerError,
} = require("../../helpers/errors");
const HttpResponse = require("../../helpers/httpResponse");

function makeSut() {
  const userServices = {
    create: jest.fn(),
    show: jest.fn(),
    update: jest.fn(),
  };
  const httpResquest = {
    body: {
      name: "any_name",
      age: 18,
      email: "any_email@email.com",
      password: "any_password",
      confirmPassword: "any_password",
      city: "any_city",
      zip_code: "12345-678",
    },
    params: {
      id: "any_id",
    },
  };

  const fakeUser = {
    id: "any_id",
    name: "any_name",
    email: "anyemail@email",
    password: "any_password",
    age: "any_age",
    city: "any_city",
    zip_code: "any_zip_code",
  };

  const userController = new UserController(userServices);

  return {
    httpResquest,
    userController,
    userServices,
    fakeUser,
  };
}

describe("UserController SUITE", () => {
  describe("UserController CREATE", () => {
    test("should return 400 and error if name not provided", async () => {
      const { httpResquest, userController, userServices } = makeSut();
      delete httpResquest.body.name;
      userServices.create.mockImplementation(() => {
        throw new MissingParamError("name");
      });
      const result = await userController.create(httpResquest);
      expect(result.body).toEqual(new MissingParamError("name"));
      expect(result.status).toBe(400);
    });
    test("should return 400 and error if age not provided", async () => {
      const { httpResquest, userController, userServices } = makeSut();
      delete httpResquest.body.age;
      userServices.create.mockImplementation(() => {
        throw new MissingParamError("age");
      });
      const result = await userController.create(httpResquest);
      expect(result.body).toEqual(new MissingParamError("age"));
      expect(result.status).toBe(400);
    });

    test("should return 400 and error if email not provided", async () => {
      const { httpResquest, userController, userServices } = makeSut();
      delete httpResquest.body.email;
      userServices.create.mockImplementation(() => {
        throw new MissingParamError("email");
      });
      const result = await userController.create(httpResquest);
      expect(result.body).toEqual(new MissingParamError("email"));
      expect(result.status).toBe(400);
    });

    test("should return 400 and error if password not provided", async () => {
      const { httpResquest, userController, userServices } = makeSut();
      delete httpResquest.body.password;
      userServices.create.mockImplementation(() => {
        throw new MissingParamError("password");
      });
      const result = await userController.create(httpResquest);
      expect(result.body).toEqual(new MissingParamError("password"));
      expect(result.status).toBe(400);
    });

    test("should return 400 and error if confirmPassword not provided", async () => {
      const { httpResquest, userController, userServices } = makeSut();
      delete httpResquest.body.confirmPassword;
      userServices.create.mockImplementation(() => {
        throw new MissingParamError("confirmPassword");
      });
      const result = await userController.create(httpResquest);
      expect(result.body).toEqual(new MissingParamError("confirmPassword"));
      expect(result.status).toBe(400);
    });

    test("should return 400 and error if city not provided", async () => {
      const { httpResquest, userController, userServices } = makeSut();
      delete httpResquest.body.city;
      userServices.create.mockImplementation(() => {
        throw new MissingParamError("city");
      });
      const result = await userController.create(httpResquest);
      expect(result.body).toEqual(new MissingParamError("city"));
      expect(result.status).toBe(400);
    });

    test("should return 400 and error if city not zip_code", async () => {
      const { httpResquest, userController, userServices } = makeSut();
      delete httpResquest.body.zip_code;
      userServices.create.mockImplementation(() => {
        throw new MissingParamError("zip_code");
      });
      const result = await userController.create(httpResquest);
      expect(result.body).toEqual(new MissingParamError("zip_code"));
      expect(result.status).toBe(400);
    });

    test("should return 400 and error if password and confirmPassword not equal", async () => {
      const { httpResquest, userController, userServices } = makeSut();
      httpResquest.body.confirmPassword = "other_any_password";
      userServices.create.mockImplementation(() => {
        throw new InvalidParamError("password");
      });
      const result = await userController.create(httpResquest);
      expect(result.body).toEqual(new InvalidParamError("password"));
      expect(result.status).toBe(400);
    });

    test("should return 500 and error if not createUserService provided", async () => {
      const { httpResquest, userController } = makeSut();
      delete userController.userService;
      const result = await userController.create(httpResquest);
      expect(result.body).toEqual(new ServerError());
      expect(result.status).toBe(500);
    });

    test("should return 200 if user is created", async () => {
      const { httpResquest, userController } = makeSut();
      const result = await userController.create(httpResquest);
      expect(result.status).toBe(200);
    });
  });

  describe("UserController SHOW", () => {
    test("should return 400 and error if id not provided", async () => {
      const { httpResquest, userController, userServices } = makeSut();
      delete httpResquest.params.id;
      userServices.show.mockImplementation(() => {
        throw new MissingParamError("id");
      });
      const result = await userController.show(httpResquest);
      expect(result.body).toEqual(new MissingParamError("id"));
      expect(result.status).toBe(400);
    });

    test("should return null if invalid id provided", async () => {
      const { httpResquest, userController, userServices } = makeSut();
      httpResquest.params.id = "invalid_id";
      userServices.show.mockReturnValueOnce(Promise.resolve(null));
      const result = await userController.show(httpResquest);
      expect(result.body.user).toBe(null);
      expect(result.status).toBe(200);
    });

    test("should ensure userService.show was called with correct param", async () => {
      const { httpResquest, userController, userServices } = makeSut();
      const userServiceShowSpy = jest.spyOn(userServices, "show");
      await userController.show(httpResquest);

      expect(userServiceShowSpy).toHaveBeenCalledWith("any_id");
    });

    test("should ensure userService.show was called with correct param", async () => {
      const { httpResquest, userController, userServices } = makeSut();
      const userServiceShowSpy = jest.spyOn(userServices, "show");
      await userController.show(httpResquest);

      expect(userServiceShowSpy).toHaveBeenCalledWith("any_id");
    });

    test("should return 200 and user if all is OK", async () => {
      const { httpResquest, userController, userServices, fakeUser } =
        makeSut();

      userServices.show.mockReturnValueOnce(Promise.resolve(fakeUser));
      const httpResponse = await userController.show(httpResquest);
      expect(httpResponse.body.user).toEqual(fakeUser);
      expect(httpResponse.status).toBe(200);
    });
  });

  describe("UserController UPDATE", () => {
    test("should return 400 and error if name not provided", async () => {
      const { httpResquest, userController, userServices } = makeSut();
      delete httpResquest.body.name;
      userServices.update.mockImplementation(() => {
        throw new MissingParamError("name");
      });
      const result = await userController.update(httpResquest);

      expect(result.body).toEqual(new MissingParamError("name"));
      expect(result.status).toBe(400);
    });
    test("should return 400 and error if age not provided", async () => {
      const { httpResquest, userController, userServices } = makeSut();
      delete httpResquest.body.age;
      userServices.update.mockImplementation(() => {
        throw new MissingParamError("age");
      });
      const result = await userController.update(httpResquest);

      expect(result.body).toEqual(new MissingParamError("age"));
      expect(result.status).toBe(400);
    });

    test("should return 400 and error if email not provided", async () => {
      const { httpResquest, userController, userServices } = makeSut();
      delete httpResquest.body.email;
      userServices.update.mockImplementation(() => {
        throw new MissingParamError("email");
      });
      const result = await userController.update(httpResquest);
      expect(result.body).toEqual(new MissingParamError("email"));
      expect(result.status).toBe(400);
    });

    test("should return 400 and error if city not provided", async () => {
      const { httpResquest, userController, userServices } = makeSut();
      delete httpResquest.body.city;
      userServices.update.mockImplementation(() => {
        throw new MissingParamError("city");
      });
      const result = await userController.update(httpResquest);
      expect(result.body).toEqual(new MissingParamError("city"));
      expect(result.status).toBe(400);
    });

    test("should return 400 and error if city not zip_code", async () => {
      const { httpResquest, userController, userServices } = makeSut();
      delete httpResquest.body.zip_code;
      userServices.update.mockImplementation(() => {
        throw new MissingParamError("zip_code");
      });
      const result = await userController.update(httpResquest);
      expect(result.body).toEqual(new MissingParamError("zip_code"));
      expect(result.status).toBe(400);
    });

    test("should ensure userService.update was called with correct params", async () => {
      const { httpResquest, userController, userServices } = makeSut();
      // Remove unecessary fields for update user
      delete httpResquest.body.password;
      delete httpResquest.body.confirmPassword;
      httpResquest.body.id = "any_id";

      const userServiceUpdateSpy = jest.spyOn(userServices, "update");
      await userController.update(httpResquest);
      expect(userServiceUpdateSpy).toHaveBeenCalledWith(httpResquest.body);
    });
  });
});
