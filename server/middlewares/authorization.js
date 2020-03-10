const { Task } = require("../models");
const createError = require("http-errors");
module.exports = {
  async authorization(req, res, next) {
    try {
      let condition = {
        where: {
          id: req.params.id
        }
      };
      let { UserId } = await Task.findOne(condition);
      if (UserId === req.user.id) {
        next();
      } else {
        throw createError(403);
      }
    } catch (error) {
      next(error);
    }
  }
};
