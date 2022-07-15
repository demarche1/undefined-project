const TokenGenerator = require("../helpers/tokenGenerator");
const AuthMiddleware = require("../middlewares/auth-middleware");
const { JWT_SECRET } = require("../config/env");

module.exports = class AuthMiddlewareFactory {
  static create() {
    const tokenGenerator = new TokenGenerator(JWT_SECRET);
    const authMiddleware = new AuthMiddleware(tokenGenerator);

    return authMiddleware;
  }
};
