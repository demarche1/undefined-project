const { MissingParamError, InvalidParamError } = require("../helpers/errors");
const MongoHelper = require("../helpers/mongo-helper");
const { ObjectId } = require("mongodb");

module.exports = class UserRepository {
  constructor() {}

  async findByEmail(email) {
    if (!email) {
      throw new MissingParamError("email");
    }

    const usersCollection = await MongoHelper.getCollection("users");
    const user = await usersCollection.findOne(
      { email },
      {
        projection: {
          name: 1,
          email: 1,
          password: 1,
          age: 1,
          city: 1,
          zip_code: 1,
        },
      }
    );

    if (!user) {
      return null;
    }

    user.id = user._id.toHexString();
    Reflect.deleteProperty(user, "_id");

    return user;
  }

  async findById(_id) {
    if (!_id) {
      throw new MissingParamError("id");
    }

    const usersCollection = await MongoHelper.getCollection("users");
    const user = await usersCollection.findOne(
      { _id: new ObjectId(_id) },
      {
        projection: {
          name: 1,
          email: 1,
          hashedPassword: 1,
          age: 1,
          city: 1,
          zip_code: 1,
        },
      }
    );

    if (!user) {
      return null;
    }

    user.id = user._id.toHexString();
    Reflect.deleteProperty(user, "_id");

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

    const updatedUser = await usersCollection.findOneAndUpdate(
      { _id: new ObjectId(user.id) },
      { $set: user }
    );

    if (!updatedUser) {
      return null;
    }

    Reflect.deleteProperty(updatedUser.value, "_id");

    return updatedUser.value;
  }
};
