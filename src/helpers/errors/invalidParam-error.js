module.exports = class InvalidParamError extends Error {
  constructor(param) {
    super(`Invalid param provided: ${param}`);
    this.name = "InvalidParamError";
  }
};
