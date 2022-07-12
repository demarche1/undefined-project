const RouterAdpter = require("../adpters/router-adpter");
const UserControllerFactory = require("../factories/user-factory");
const router = require("express").Router();

const userController = UserControllerFactory.create();

router.post("/user", RouterAdpter.adapt(userController, "create"));
router.get("/user/:id", RouterAdpter.adapt(userController, "show"));
router.put("/user/:id", RouterAdpter.adapt(userController, "update"));

module.exports = router;
