jest.mock("bcrypt", () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

const Encryptor = require("../encryptor");
const bcrypt = require("bcrypt");
const MissingParamError = require("../errors/missingParam-error");

describe("Encryptor", () => {
  describe("Encryptor.compare", () => {
    test("should return true if password and hashed password is same", async () => {
      const encryptor = new Encryptor();
      bcrypt.compare.mockReturnValueOnce(Promise.resolve(true));
      const result = await encryptor.compare("password", "hash_password");

      expect(result).toBe(true);
    });

    test("should return false if password and hashed password is diferent", async () => {
      const encryptor = new Encryptor();
      bcrypt.compare.mockReturnValueOnce(Promise.resolve(false));
      const result = await encryptor.compare(
        "invalid_password",
        "hash_password"
      );

      expect(result).toBe(false);
    });

    test("should call bcrypt with correct values", async () => {
      const encryptor = new Encryptor();
      const compareSpy = jest.spyOn(encryptor, "compare");
      await encryptor.compare("password", "hash_password");
      expect(compareSpy).toHaveBeenCalledWith("password", "hash_password");
    });

    test("should throws error if compare be called with no password", async () => {
      const encryptor = new Encryptor();
      expect(encryptor.compare(undefined, "hash_password")).rejects.toThrow(
        new MissingParamError("password")
      );
    });

    test("should throws error if compare be called with no hashed_password", async () => {
      const encryptor = new Encryptor();
      expect(encryptor.compare("password", undefined)).rejects.toThrow(
        new MissingParamError("hash")
      );
    });
  });

  describe("Encryptor.hash", () => {
    test("should throws if password no provided", () => {
      const encryptor = new Encryptor();
      expect(() => encryptor.hash(undefined)).rejects.toThrow(
        new MissingParamError("password")
      );
    });

    test("should ensure bcrypt is called with correct params", async () => {
      const encryptor = new Encryptor();
      const hashSpy = jest.spyOn(bcrypt, "hash");
      await encryptor.hash("password");
      expect(hashSpy).toHaveBeenCalledWith("password", 10);
    });
  });
});
