jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

const TokenGenerator = require("../tokenGenerator");
const jwt = require("jsonwebtoken");
const { MissingParamError } = require("../errors");

describe("TokenGenerator", () => {
  test("should throws if TokenGenerator create without secret", () => {
    const tokenGenerator = new TokenGenerator();
    expect(() => tokenGenerator.generate("ANY_ID")).toThrow(
      new MissingParamError("secret")
    );
  });

  test("should throws if generate called without id param", () => {
    const tokenGenerator = new TokenGenerator("any_secret");
    expect(() => tokenGenerator.generate()).toThrow(
      new MissingParamError("id")
    );
  });

  test("should ensure tokenGenerator.generate will be called with correct values", () => {
    const tokenGenerator = new TokenGenerator("any_secret");
    const tokenGeneratorSpy = jest.spyOn(tokenGenerator, "generate");
    tokenGenerator.generate("any_id");
    expect(tokenGeneratorSpy).toHaveBeenCalledWith("any_id");
  });

  test("should ensure jwt.sign will be called with correct values", () => {
    const tokenGenerator = new TokenGenerator("any_secret");
    tokenGenerator.generate("any_id");
    expect(jwt.sign).toHaveBeenCalledWith({ id: "any_id" }, "any_secret");
  });

  test("should ensure tokenGenerator.generate will return a token", () => {
    const tokenGenerator = new TokenGenerator("any_secret");
    jwt.sign.mockReturnValueOnce("any_token");
    const token = tokenGenerator.generate("any_id");
    expect(token).toBe("any_token");
  });
});
