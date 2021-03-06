const bcrypt = require("bcrypt");
const MissingParamError = require("./errors/missingParam-error");

module.exports = class Encryptor {
  async compare(password, hash) {
    if (!password) {
      throw new MissingParamError("password");
    }

    if (!hash) {
      throw new MissingParamError("hash");
    }

    return await bcrypt.compare(password, hash);
  }

  async hash(password) {
    if (!password) {
      throw new MissingParamError("password");
    }

    return await bcrypt.hash(password, 10);
  }
};
