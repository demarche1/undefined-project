const { MissingParamError } = require("../helpers/errors");
const MongoHelper = require("../helpers/mongo-helper");

module.exports = class UserRepository {
  async findByEmail(email) {
    if (!email) {
      throw new MissingParamError("email");
    }

    const usersCollection = await MongoHelper.getCollection("users");
    const user = usersCollection.findOne(
      { email },
      { projection: { email: 1, password: 1 } }
    );

    return user;
  }
};
