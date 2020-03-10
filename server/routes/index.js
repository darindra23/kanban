const routes = require("express").Router();
const user = require("./user");
const task = require("./task");
const { authentication } = require("../middlewares/authentication");

routes.use("/user", user);
routes.use("/tasks", authentication, task);

module.exports = routes;
