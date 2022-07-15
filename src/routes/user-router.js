const RouterAdpter = require("../adpters/router-adpter");
const MiddlewareAdpter = require("../adpters/middleware-adpter");

const UserControllerFactory = require("../factories/user-factory");
const AuthMiddlewareFactory = require("../factories/auth-middleware-factory");

const router = require("express").Router();

const userController = UserControllerFactory.create();
const authMiddleware = AuthMiddlewareFactory.create();

router.post("/user", RouterAdpter.adapt(userController, "create"));

router.get(
  "/user/:id",
  MiddlewareAdpter.adapt(authMiddleware),
  RouterAdpter.adapt(userController, "show")
);
router.put(
  "/user/:id",
  MiddlewareAdpter.adapt(authMiddleware),
  RouterAdpter.adapt(userController, "update")
);

module.exports = router;
