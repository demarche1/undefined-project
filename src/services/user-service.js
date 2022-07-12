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

    const result = await this.userRepository.create({
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

    return true;
  }

  async show(id) {}

  async update(id) {}
};