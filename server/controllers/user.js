const { User } = require("../models");
const { sign } = require("../helpers/jwt");
const { compare } = require("../helpers/bcrypt");
const createError = require("http-errors");

class Controller {
  static async register(req, res, next) {
    try {
      let create = await User.create(req.body);
      res
        .status(201)
        .json({ Message: "User successfully created.", Data: create });
    } catch (err) {
      next(err);
    }
  }
  static async login(req, res, next) {
    try {
      let condition = {
        where: {
          email: req.body.email
        }
      };
      let { id, email, password } = await User.findOne(condition);
      if (compare(req.body.password, password)) {
        let access_token = sign({ id, email });
        res.status(200).json({ access_token });
      } else {
        throw createError(400);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
