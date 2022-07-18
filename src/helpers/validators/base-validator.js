const { InvalidParamError, MissingParamError } = require("../errors");

module.exports = class BaseValidator {
  validators = [];
  errors = [];

  ensureAllParamsProvided() {
    this.validators.push((params) => {
      const keys = Object.keys(params);

      keys.map((key) => {
        if (!params[key]) {
          this.errors.push(new MissingParamError(key));
        }
      });
    });

    return this;
  }

  ensureString() {
    this.validators.push((value) => {
      const [key] = Object.keys(value);
      if (!key || typeof key !== "string") {
        this.errors.push(new InvalidParamError(key));
      }
    });

    return this;
  }

  ensureNumber() {
    this.validators.push((value) => {
      const [key] = Object.keys(value);
      if (!key || typeof key !== "number") {
        this.errors.push(new InvalidParamError(key));
      }
    });

    return this;
  }

  validate(value) {
    this.validators.forEach((validator) => {
      validator(value);
    });

    return this.errors;
  }
};
