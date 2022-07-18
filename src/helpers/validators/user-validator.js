const { InvalidParamError } = require("../errors");
const BaseValidator = require("./base-validator");

module.exports = class UserValidator extends BaseValidator {
  constructor() {
    super();
  }

  ensureIsValidEmail() {
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

  ensurePasswordEqualsTo(toCompareKey) {
    this.validators.push((params) => {
      if (params["password"] !== params[toCompareKey]) {
        this.errors.push(new InvalidParamError("password"));
      }
    });

    return this;
  }
};
