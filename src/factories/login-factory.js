const AuthService = require("../services/auth-service");
const UserRepository = require("../repositories/user-repository");
const Encryptor = require("../helpers/encryptor");
const TokenGenerator = require("../helpers/tokenGenerator");
const UserModel = require("../models/user-model");
const { JWT_SECRET } = require("../config/env");
const LoginController = require("../controllers/login-controller");

module.exports = class LoginControllerFactory {
  static create() {
    const tokenGenerator = new TokenGenerator(JWT_SECRET);
    const encryptor = new Encryptor();
    const userRepository = new UserRepository(UserModel);
    const authService = new AuthService(
      userRepository,
      encryptor,
      tokenGenerator
    );
    const loginController = new LoginController(authService);

    return loginController;
  }
};
