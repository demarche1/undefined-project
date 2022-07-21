const UserController = require("../controllers/user-controller");
const UserRepository = require("../repositories/user-repository");
const UserService = require("../services/user-service");
const Encryptor = require("../helpers/encryptor");
const UserValidator = require("../helpers/validators/user-validator");

module.exports = class UserControllerFactory {
  static create() {
    const encryptor = new Encryptor();
    const userRepository = new UserRepository();
    const userService = new UserService(
      userRepository,
      encryptor,
      UserValidator
    );
    const userController = new UserController(userService);

    return userController;
  }
};
