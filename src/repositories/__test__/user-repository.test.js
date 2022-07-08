const MongoHelper = require("../../helpers/mongo-helper");
const { MONGO_URI } = require("../../config/env");
const UserRepository = require("../user-repository");
const { MissingParamError } = require("../../helpers/errors");
describe.only("UserRepository.findByEmail", () => {
  let usersCollection;
  beforeAll(async () => {
    await MongoHelper.connect(MONGO_URI);
    usersCollection = await MongoHelper.getCollection("users");
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  test("should throws if no email provided", () => {
    const repository = new UserRepository();
    expect(repository.findByEmail()).rejects.toThrow(
      new MissingParamError("email")
    );
  });

  test("should return a user if found", async () => {
    const repository = new UserRepository();
    const fakeUser = await usersCollection.insertOne({
      email: "valid_email@mail.com",
      name: "any_name",
      age: 50,
      state: "any_state",
      password: "hashed_password",
    });
    console.log("fakeUser", fakeUser);
    const user = await repository.findByEmail("valid_email@mail.com");
    console.log("user", user);
    expect(user._id.toHexString()).toBe(fakeUser.insertedId.toHexString());
  });
});
