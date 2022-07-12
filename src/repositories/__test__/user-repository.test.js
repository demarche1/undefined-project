const MongoHelper = require("../../helpers/mongo-helper");
const { mongoUri } = require("../../../globalConfig.json");
const UserRepository = require("../user-repository");
const { MissingParamError } = require("../../helpers/errors");
const UserModel = require("../../models/user-model");

describe("UserRepository.findByEmail", () => {
  let usersCollection;

  beforeAll(async () => {
    await MongoHelper.connect(mongoUri);
    usersCollection = await MongoHelper.getCollection("users");
  });

  beforeEach(async () => {
    await usersCollection.deleteMany({});
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  test("should throws if no email provided", () => {
    const repository = new UserRepository(UserModel);
    expect(repository.findByEmail()).rejects.toThrow(
      new MissingParamError("email")
    );
  });

  test("should return a user if found", async () => {
    const repository = new UserRepository(UserModel);
    const fakeUser = await usersCollection.insertOne({
      email: "valid_email@mail.com",
      name: "any_name",
      age: 50,
      city: "city_state",
      zip_code: "12345",
      password: "hashed_password",
    });

    const user = await repository.findByEmail("valid_email@mail.com");
    expect(user.id).toBe(fakeUser.insertedId.toHexString());
  });

  test("should return null if user not found", async () => {
    const repository = new UserRepository(UserModel);
    const user = await repository.findByEmail("valid_email@mail.com");
    expect(user).toBeNull();
  });
});
