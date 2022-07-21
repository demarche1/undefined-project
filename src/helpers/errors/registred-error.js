module.exports = class RegistredError extends Error {
  constructor(paramName) {
    super(`The ${paramName} already been registred`);
    this.name = "RegistredError";
  }
};
