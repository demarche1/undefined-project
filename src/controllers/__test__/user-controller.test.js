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
  };

  const userController = new UserController(userServices);

  return {
    httpResquest,
    userController,
    userServices,
  };
}

describe("UserController", () => {
  test("should return 400 and error if name not provided", async () => {
    const { httpResquest, userController } = makeSut();
    delete httpResquest.body.name;
    const result = await userController.create(httpResquest);
    expect(result.body).toEqual(new MissingParamError("name"));
    expect(result.status).toBe(400);
  });
  test("should return 400 and error if age not provided", async () => {
    const { httpResquest, userController } = makeSut();
    delete httpResquest.body.age;
    const result = await userController.create(httpResquest);
    expect(result.body).toEqual(new MissingParamError("age"));
    expect(result.status).toBe(400);
  });

  test("should return 400 and error if email not provided", async () => {
    const { httpResquest, userController } = makeSut();
    delete httpResquest.body.email;
    const result = await userController.create(httpResquest);
    expect(result.body).toEqual(new MissingParamError("email"));
    expect(result.status).toBe(400);
  });

  test("should return 400 and error if password not provided", async () => {
    const { httpResquest, userController } = makeSut();
    delete httpResquest.body.password;
    const result = await userController.create(httpResquest);
    expect(result.body).toEqual(new MissingParamError("password"));
    expect(result.status).toBe(400);
  });

  test("should return 400 and error if confirmPassword not provided", async () => {
    const { httpResquest, userController } = makeSut();
    delete httpResquest.body.confirmPassword;
    const result = await userController.create(httpResquest);
    expect(result.body).toEqual(new MissingParamError("confirmPassword"));
    expect(result.status).toBe(400);
  });

  test("should return 400 and error if city not provided", async () => {
    const { httpResquest, userController } = makeSut();
    delete httpResquest.body.city;
    const result = await userController.create(httpResquest);
    expect(result.body).toEqual(new MissingParamError("city"));
    expect(result.status).toBe(400);
  });

  test("should return 400 and error if city not zip_code", async () => {
    const { httpResquest, userController } = makeSut();
    delete httpResquest.body.zip_code;
    const result = await userController.create(httpResquest);
    expect(result.body).toEqual(new MissingParamError("zip_code"));
    expect(result.status).toBe(400);
  });

  test("should return 400 and error if password and confirmPassword not equal", async () => {
    const { httpResquest, userController } = makeSut();
    httpResquest.body.confirmPassword = "other_any_password";
    const result = await userController.create(httpResquest);
    expect(result.body).toEqual(new InvalidParamError("confirmPassword"));
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
