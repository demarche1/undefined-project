const router = require("express").Router();

const RouterAdpter = require("../adpters/router-adpter");
const LoginControllerFactory = require("../factories/login-factory");
const loginController = LoginControllerFactory.create();

router.get("/login", RouterAdpter.adapt(loginController, "login"));

module.exports = router;
