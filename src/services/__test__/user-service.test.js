const { MissingParamError } = require("../../helpers/errors");
const UserService = require("../user-service");

function makeSut() {
  const userRepository = {
    create: jest.fn(),
  };

  const encryptor = {
    hash: jest.fn(),
  };

  const userService = new UserService(userRepository, encryptor);

  const fakeUser = {
    name: "any_name",
    email: "any_email@email.com",
    password: "any_password",
    age: 50,
    city: "any_city",
    zip_code: "any_zip_code",
  };

  return { userService, fakeUser, userRepository, encryptor };
}

describe("UserService", () => {
  test("should throws if name is not provided", async () => {
    const { userService, fakeUser } = makeSut();
    delete fakeUser.name;

    expect(() => userService.create(fakeUser)).rejects.toThrow(
      new MissingParamError("name")
    );
  });

  test("should throws if email is not provided", async () => {
    const { userService, fakeUser } = makeSut();
    delete fakeUser.email;

    expect(() => userService.create(fakeUser)).rejects.toThrow(
      new MissingParamError("email")
    );
  });

  test("should throws if password is not provided", async () => {
    const { userService, fakeUser } = makeSut();
    delete fakeUser.password;

    expect(() => userService.create(fakeUser)).rejects.toThrow(
      new MissingParamError("password")
    );
  });

  test("should throws if age is not provided", async () => {
    const { userService, fakeUser } = makeSut();
    delete fakeUser.age;

    expect(() => userService.create(fakeUser)).rejects.toThrow(
      new MissingParamError("age")
    );
  });

  test("should throws if city is not provided", async () => {
    const { userService, fakeUser } = makeSut();
    delete fakeUser.city;

    expect(() => userService.create(fakeUser)).rejects.toThrow(
      new MissingParamError("city")
    );
  });

  test("should throws if zip_code is not provided", async () => {
    const { userService, fakeUser } = makeSut();
    delete fakeUser.zip_code;

    expect(() => userService.create(fakeUser)).rejects.toThrow(
      new MissingParamError("zip_code")
    );
  });

  test("should ensure encryptor was called with correct param", async () => {
    const { userService, fakeUser, _, encryptor } = makeSut();
    const hashSpy = jest.spyOn(encryptor, "hash");
    await userService.create(fakeUser);
    expect(hashSpy).toHaveBeenCalledWith(fakeUser.password);
  });

  test("should ensure userRepository was called with correct param", async () => {
    const { userService, fakeUser, userRepository, encryptor } = makeSut();
    encryptor.hash.mockReturnValueOnce("hashed_password");
    const repositorySpy = jest.spyOn(userRepository, "create");
    await userService.create(fakeUser);

    expect(repositorySpy).toHaveBeenCalledWith({
      name: fakeUser.name,
      email: fakeUser.email,
      hashedPassword: "hashed_password",
      age: fakeUser.age,
      city: fakeUser.city,
      zip_code: fakeUser.zip_code,
    });
  });

  test("should return null if can`t create user", async () => {
    const { userService, fakeUser, userRepository } = makeSut();
    userRepository.create.mockReturnValueOnce(null);
    const result = await userService.create(fakeUser);
    expect(result).toBe(null);
  });

  test("should return true if user true if user created", async () => {
    const { userService, fakeUser, userRepository } = makeSut();
    userRepository.create.mockReturnValueOnce("any_id");
    const result = await userService.create(fakeUser);
    expect(result).toBeTruthy();
  });
});
