const { MissingParamError } = require("../helpers/errors");
const MongoHelper = require("../helpers/mongo-helper");

module.exports = class UserRepository {
  constructor(model) {
    this.model = model;
  }
  async findByEmail(email) {
    if (!email) {
      throw new MissingParamError("email");
    }

    const usersCollection = await MongoHelper.getCollection("users");
    const userFromDb = await usersCollection.findOne(
      { email },
      { projection: { email: 1, password: 1, age: 1, city: 1, zip_code: 1 } }
    );

    if (!userFromDb) {
      return null;
    }

    const user = new this.model(userFromDb);

    return user;
  }
};
