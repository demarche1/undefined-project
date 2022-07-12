module.exports = class RouterAdpter {
  static adapt(controller, method) {
    return async (req, res) => {
      const httpResquest = {
        body: req.body,
        headers: req.headers,
        params: req.params,
      };
      const httpResponse = await controller[method](httpResquest);

      return res.status(httpResponse.status).json(httpResponse.body);
    };
  }
};
