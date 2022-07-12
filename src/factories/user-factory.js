const UserController = require("../controllers/user-controller");
const UserRepository = require("../repositories/user-repository");
const UserService = require("../services/user-service");
const Encryptor = require("../helpers/encryptor");
const UserModel = require("../models/user-model");

module.exports = class UserControllerFactory {
  static create() {
    const encryptor = new Encryptor();
    const userRepository = new UserRepository(UserModel);
    const userService = new UserService(userRepository, encryptor);
    const userController = new UserController(userService);

    return userController;
  }
};
