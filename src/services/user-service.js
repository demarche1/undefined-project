const { MissingParamError } = require("../helpers/errors");

module.exports = class UserService {
  constructor(userRepository, encryptor) {
    this.userRepository = userRepository;
    this.encryptor = encryptor;
  }

  async create({ name, email, password, age, city, zip_code }) {
    if (!name) {
      throw new MissingParamError("name");
    }

    if (!email) {
      throw new MissingParamError("email");
    }

    if (!password) {
      throw new MissingParamError("password");
    }

    if (!age) {
      throw new MissingParamError("age");
    }

    if (!city) {
      throw new MissingParamError("city");
    }

    if (!zip_code) {
      throw new MissingParamError("zip_code");
    }

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

  async show(id) {
    if (!id) {
      throw new MissingParamError("id");
    }

    const user = await this.userRepository.findById(id);

    if (!user) {
      return null;
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
