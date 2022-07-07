const { MissingParamError } = require("../../helpers/errors");
const AuthService = require("../auth-service");

describe("AuthService", () => {
  test("should throws if no email provided", async () => {
    const authService = new AuthService();
    const userMock = { password: "any_password" };
    const promise = authService.auth(userMock);

    expect(promise).rejects.toThrow(new MissingParamError("email"));
  });

  test("should throws if no password provided", async () => {
    const authService = new AuthService();
    const userMock = { email: "any_email@email.com" };
    const promise = authService.auth(userMock);

    expect(promise).rejects.toThrow(new MissingParamError("password"));
  });

  test("should call userRepository.findByEmail with correct email ", async () => {
    const userRepositorySpy = {
      findByEmail: jest.fn((email) => ({})),
    };
    const encryptorSpy = {
      compare: () => {},
    };
    const authService = new AuthService(userRepositorySpy, encryptorSpy);

    const userMock = {
      email: "valid_email@email.com",
      password: "any_password",
    };

    await authService.auth(userMock);

    expect(userRepositorySpy.findByEmail.mock.calls.length).toBe(1);
    expect(userRepositorySpy.findByEmail).toHaveBeenCalledWith(
      "valid_email@email.com"
    );
  });

  test("should return null if provide invalid password", async () => {
    const userRepositorySpy = {
      findByEmail: (email) => ({
        email: "any_email@email",
        password: "valid_password",
      }),
    };
    const encryptorSpy = {
      compare: jest.fn((password, hashedPassword) => null),
    };
    const authService = new AuthService(userRepositorySpy, encryptorSpy);
    const userMock = {
      email: "any_email@email",
      password: "invalid_password",
    };
    const result = await authService.auth(userMock);

    expect(encryptorSpy.compare.mock.calls.length).toBe(1);
    expect(encryptorSpy.compare).toHaveBeenCalledWith(
      userMock.password,
      "valid_password"
    );
    expect(result).toBeNull();
  });

  test("should return token if all date provided is valid", async () => {
    const userRepositorySpy = {
      findByEmail: (email) => ({
        id: "any_id",
        email: "any_email@email",
        password: "valid_password",
      }),
    };
    const encryptorSpy = {
      compare: jest.fn((password, hashedPassword) => true),
    };
    const tokenGeneratorSpy = {
      generate: jest.fn(() => "valid_token"),
    };
    const authService = new AuthService(
      userRepositorySpy,
      encryptorSpy,
      tokenGeneratorSpy
    );
    const userMock = {
      email: "valid_email@email",
      password: "valid_password",
    };
    const result = await authService.auth(userMock);

    expect(tokenGeneratorSpy.generate.mock.calls.length).toBe(1);
    expect(tokenGeneratorSpy.generate).toHaveBeenCalledWith("any_id");
    expect(result).toBe("valid_token");
  });
});
