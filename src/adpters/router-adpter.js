module.exports = class RouterAdpter {
  adapt(controller, method) {
    return async (req, res) => {
      const httpResquest = {
        body: req.body,
      };
      const httpResponse = await controller[method](httpResquest);

      return res.status(httpResponse.status).json(httpResponse.body);
    };
  }
};
