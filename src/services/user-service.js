const {
  MissingParamError,
  ErrorDispatcher,
  UnauthorizedError,
} = require("../helpers/errors");
const UserValidator = require("../helpers/validators/user-validator");

module.exports = class UserService {
  constructor(userRepository, encryptor) {
    this.userRepository = userRepository;
    this.encryptor = encryptor;
  }

  async create({
    name,
    email,
    password,
    confirmPassword,
    age,
    city,
    zip_code,
  }) {
    const userValidador = new UserValidator();
    const errors = userValidador
      .ensureAllParamsProvided()
      .ensurePasswordEqualsTo("confirmPassword")
      .ensureIsValidEmail()
      .validate({
        name,
        email,
        password,
        confirmPassword,
        age,
        city,
        zip_code,
      });

    ErrorDispatcher.dispatch(errors);

    const hashedPassword = await this.encryptor.hash(password);
    const result = await this.userRepository.createUser({
      name,
      email,
      hashedPassword,
      age,
      city,
      zip_code,
    });

    if (!result) {
      return null;
    }

    return result;
  }

  async show(id, authUser) {
    if (!id) {
      throw new MissingParamError("id");
    }

    const user = await this.userRepository.findById(id);

    if (!user) {
      return null;
    }

    if (user.id !== authUser.id) {
      throw new UnauthorizedError();
    }

    return user;
  }

  async update({ id, name, age, email, city, zip_code }) {
    if (!name) {
      throw new MissingParamError("name");
    }

    if (!age) {
      throw new MissingParamError("age");
    }

    if (!email) {
      throw new MissingParamError("email");
    }

    if (!city) {
      throw new MissingParamError("city");
    }

    if (!zip_code) {
      throw new MissingParamError("zip_code");
    }

    const result = await this.userRepository.updateUserInfo({
      id,
      name,
      age,
      email,
      city,
      zip_code,
    });

    if (!result) {
      return null;
    }

    return true;
  }
};
