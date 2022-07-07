module.exports = class UnauthorizedError extends Error {
  constructor() {
    super(`Invalid credentials`);
    this.name = "UnauthorizedError";
  }
};
