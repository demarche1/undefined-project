const { MissingParamError } = require("../helpers/errors");

module.exports = class AuthService {
  constructor(userRepository, encryptor, tokenGenerator) {
    this.userRepository = userRepository;
    this.encryptor = encryptor;
    this.tokenGenerator = tokenGenerator;
  }

  async auth({ email, password }) {
    if (!email) {
      throw new MissingParamError("email");
    }

    if (!password) {
      throw new MissingParamError("password");
    }

    const user = await this.userRepository.findByEmail(email);

    const isValid =
      user && (await this.encryptor.compare(password, user.hashedPassword));

    if (!isValid) {
      return null;
    }

    const token = await this.tokenGenerator.generate(user.id);

    return token;
  }
};
