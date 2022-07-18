module.exports = class MiddlewareAdpter {
  static adapt(middleware, method) {
    return async (req, res, next) => {
      const httpResquest = {
        body: req.body,
        headers: req.headers,
        params: req.params,
      };
      const [httpResponse, decoded] = await middleware[method](httpResquest);

      if (decoded) {
        req.auth = decoded;
        return next();
      }

      return res.status(httpResponse.status).json(httpResponse.body);
    };
  }
};
