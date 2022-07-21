const {
  MissingParamError,
  ErrorDispatcher,
  UnauthorizedError,
  RegistredError,
} = require("../helpers/errors");

module.exports = class UserService {
  constructor(userRepository, encryptor, userValidador) {
    this.userRepository = userRepository;
    this.encryptor = encryptor;
    this.userValidador = userValidador;
  }

  async create(userParams) {
    const userValidador = new this.userValidador();
    const errors = userValidador
      .ensureAllParamsProvided([
        "name",
        "email",
        "password",
        "confirmPassword",
        "age",
        "city",
        "zip_code",
      ])
      .ensurePasswordEqualsTo("confirmPassword")
      .ensureIsValidEmail()
      .validate(userParams);

    if (errors && errors.length > 0) {
      ErrorDispatcher.dispatch(errors);
    }

    const hasEmailRegistred = await this.userRepository.findByEmail(
      userParams.email
    );

    if (hasEmailRegistred) {
      throw new RegistredError("email");
    }

    const hashPassword = await this.encryptor.hash(userParams.password);
    userParams.password = hashPassword;
    Reflect.deleteProperty(userParams, "confirmPassword");

    const result = await this.userRepository.createUser(userParams);

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

  async update(userParams) {
    const userValidador = new this.userValidador();
    const errors = userValidador
      .ensureAllParamsProvided([
        "id",
        "name",
        "email",
        "age",
        "city",
        "zip_code",
      ])
      .ensureIsValidEmail()
      .validate(userParams);

    if (errors && errors.length > 0) {
      ErrorDispatcher.dispatch(errors);
    }

    const result = await this.userRepository.updateUserInfo(userParams);

    if (!result) {
      return null;
    }

    return true;
  }
};
