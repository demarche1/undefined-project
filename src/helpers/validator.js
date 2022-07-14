const { InvalidParamError, MissingParamError } = require("./errors");

module.exports = class Validator {
  constructor() {
    this.validators = [];
    this.errors = [];
  }

  isAllParamsProvided() {
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

  string() {
    this.validators.push((value) => {
      const key = Object.keys(value)[0];
      if (!key || typeof key !== "string") {
        this.errors.push(new InvalidParamError(key));
      }
    });

    return this;
  }

  email() {
    this.validators.push((value) => {
      if (
        !/^[a-z|A-Z|0-9|!#$%&'*+\-\/=?^_`{|}~]+@[a-z]+\.[a-z]{2,3}$/.test(
          value.email
        )
      ) {
        this.errors.push(new InvalidParamError("email"));
      }
    });

    return this;
  }

  required() {
    this.validators.push((value) => {
      const key = Object.keys(value)[0];
      if (!value[key]) {
        this.errors.push(new MissingParamError(key));
      }
    });

    return this;
  }

  equalsTo(key, toCompareKey) {
    this.validators.push((params) => {
      if (params[key] !== params[toCompareKey]) {
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
