const { MissingParamError } = require("../../helpers/errors");
const UserService = require("../user-service");

function makeSut() {
  const userRepository = {
    createUser: jest.fn(),
    findByEmail: jest.fn(),
    findById: jest.fn(),
    updateUserInfo: jest.fn(),
  };

  const encryptor = {
    hash: jest.fn(),
    compare: jest.fn(),
  };

  const userService = new UserService(userRepository, encryptor);

  const fakeUser = {
    name: "any_name",
    email: "any_email@email.com",
    password: "any_password",
    confirmPassword: "any_password",
    age: 50,
    city: "any_city",
    zip_code: "any_zip_code",
  };

  return { userService, fakeUser, userRepository, encryptor };
}

describe("UserService SUITE", () => {
  describe("UserService CREATE", () => {
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

    test("should throws if confirmPassword is not provided", async () => {
      const { userService, fakeUser } = makeSut();
      delete fakeUser.confirmPassword;

      expect(() => userService.create(fakeUser)).rejects.toThrow(
        new MissingParamError("confirmPassword")
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
      const repositorySpy = jest.spyOn(userRepository, "createUser");
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
      userRepository.createUser.mockReturnValueOnce(null);
      const result = await userService.create(fakeUser);
      expect(result).toBe(null);
    });

    test("should return true if user true if user created", async () => {
      const { userService, fakeUser, userRepository } = makeSut();
      userRepository.createUser.mockReturnValueOnce("any_id");
      const result = await userService.create(fakeUser);
      expect(result).toBeTruthy();
    });
  });

  describe("UserService SHOW", () => {
    test("should throws if id no provided", async () => {
      const { userService } = makeSut();
      expect(() => userService.show()).rejects.toThrow(
        new MissingParamError("id")
      );
    });

    test("should return null if no user finded", async () => {
      const { userService, userRepository } = makeSut();
      userRepository.findById.mockReturnValueOnce(Promise.resolve(null));
      const result = await userService.show("invalid_id");
      expect(result).toBe(null);
    });

    test("should ensure userRepository.findById was called with correct param", async () => {
      const { userService, userRepository } = makeSut();
      const userRepositorySpy = jest.spyOn(userRepository, "findById");
      await userService.show("any_id");
      expect(userRepositorySpy).toHaveBeenCalledWith("any_id");
    });

    test("should return a User if all OK", async () => {
      const { userService, userRepository, _, fakeUser } = makeSut();
      userRepository.findById.mockReturnValueOnce(Promise.resolve(fakeUser));

      const result = await userService.show("any_id");
      expect(result).toEqual(fakeUser);
    });
  });

  describe("UserService UPDATE", () => {
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

    test("should ensure userRepository.updateUserInfo was called with correct params", async () => {
      const { userService, fakeUser, userRepository } = makeSut();
      const userRepositorySpy = jest.spyOn(userRepository, "updateUserInfo");
      delete fakeUser.password;
      delete fakeUser.confirmPassword;
      await userService.update(fakeUser);
      expect(userRepositorySpy).toHaveBeenCalledWith(fakeUser);
    });

    test("should return null if user not updated", async () => {
      const { userService, fakeUser, userRepository } = makeSut();
      userRepository.updateUserInfo.mockReturnValueOnce(Promise.resolve(null));
      delete fakeUser.password;
      const result = await userService.update(fakeUser);
      expect(result).toBe(null);
    });

    test("should true if all is OK", async () => {
      const { userService, fakeUser, userRepository } = makeSut();
      userRepository.updateUserInfo.mockReturnValueOnce(Promise.resolve(true));
      delete fakeUser.password;
      const result = await userService.update(fakeUser);
      expect(result).toBeTruthy();
    });
  });
});
