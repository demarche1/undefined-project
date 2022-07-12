const { MissingParamError, InvalidParamError } = require("../helpers/errors");
const MongoHelper = require("../helpers/mongo-helper");
const { ObjectId } = require("mongodb");

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

  async findById(_id) {
    if (!_id) {
      throw new MissingParamError("id");
    }

    const usersCollection = await MongoHelper.getCollection("users");
    const userFromDb = await usersCollection.findOne(
      { _id: new ObjectId(_id) },
      { projection: { email: 1, password: 1, age: 1, city: 1, zip_code: 1 } }
    );

    console.log("userFromDb", userFromDb);
    console.log("id", _id);

    if (!userFromDb) {
      return null;
    }

    const user = new this.model(userFromDb);

    return user;
  }

  async createUser(user) {
    if (!user) {
      throw InvalidParamError("user");
    }

    const usersCollection = await MongoHelper.getCollection("users");
    const { insertedId } = await usersCollection.insertOne(user);

    return insertedId.toHexString();
  }

  async updateUserInfo(user) {
    const usersCollection = await MongoHelper.getCollection("users");
    const result = await usersCollection.findOneAndUpdate(
      { name: user.name },
      { $set: user }
    );

    return result;
  }
};
