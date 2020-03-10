const routes = require("express").Router();
const Controller = require("../controllers/task");
const { authorization } = require("../middlewares/authorization");

routes.get("/", Controller.all);
routes.get("/:id", Controller.get);
routes.post("/", Controller.create);
routes.put("/:id", authorization, Controller.edit);
routes.delete("/:id", authorization, Controller.delete);

module.exports = routes;
