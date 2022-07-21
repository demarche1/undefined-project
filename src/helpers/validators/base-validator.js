const { InvalidParamError, MissingParamError } = require("../errors");

module.exports = class BaseValidator {
  validators = [];
  errors = [];

  ensureAllParamsProvided(schema) {
    this.validators.push((params) => {
      const keys = Object.keys(params);

      keys.forEach((_, index) => {
        const key = schema[index];

        if (!params[key]) {
          this.errors.push(new MissingParamError(key));
        }
      });
    });

    return this;
  }

  validate(value) {
    if (this.errors.length > 0) {
      this.errors = [];
    }

    this.validators.forEach((validator) => {
      validator(value);
    });

    return this.errors;
  }
};
