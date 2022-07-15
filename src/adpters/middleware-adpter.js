module.exports = class RouterAdpter {
  static adapt(middleware) {
    return async (req, res, next) => {
      const httpResquest = {
        body: req.body,
        headers: req.headers,
        params: req.params,
      };
      const httpResponse = await middleware.auth(httpResquest);

      if (!httpResponse) {
        return next();
      }

      return res.status(httpResponse.status).json(httpResponse.body);
    };
  }
};
