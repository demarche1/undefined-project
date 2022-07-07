const jwt = require("jsonwebtoken");

module.exports = class TokenGenerator {
  constructor(secret) {
    this.secret = secret;
  }
  generate(id) {
    return jwt.sign({ id }, this.secret);
  }
};
