const HttpResponse = require("../helpers/httpResponse");

module.exports = class AuthMiddleware {
  constructor(tokenGenerator) {
    this.tokenGenerator = tokenGenerator;
  }
  async auth(httpRequest) {
    const token = httpRequest.headers["x-access-token"];
    if (!token) {
      return [HttpResponse.Unauthorized(), null];
    }
    try {
      const decoded = await this.tokenGenerator.verifyToken(token);

      if (!decoded) {
        return [HttpResponse.Unauthorized(), null];
      }

      return [null, decoded];
    } catch (error) {
      return [HttpResponse.Forbbiden(), null];
    }
  }
};
