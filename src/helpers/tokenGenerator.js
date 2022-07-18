const { MissingParamError } = require("./errors");
const jwt = require("jsonwebtoken");

module.exports = class TokenGenerator {
  constructor(secret) {
    this.secret = secret;
  }
  generate(id) {
    if (!this.secret) {
      throw new MissingParamError("secret");
    }

    if (!id) {
      throw new MissingParamError("id");
    }

    const token = jwt.sign({ id }, this.secret);

    return token;
  }

  async verifyToken(token) {
    const { id } = await jwt.verify(token, this.secret);

    return id;
  }
};
