const { User } = require("../models");
const { sign } = require("../helpers/jwt");
const { compare } = require("../helpers/bcrypt");
const createError = require("http-errors");
const { OAuth2Client } = require("google-auth-library");
const generator = require("generate-password");
const client = new OAuth2Client(process.env.CLIENT_ID);

class Controller {
  static async register(req, res, next) {
    try {
      let { id, email, fullname } = await User.create(req.body);
      let access_token = sign({ id, email });
      res.status(201).json({ access_token, fullname });
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
      let { id, fullname, email, password } = await User.findOne(condition);
      if (compare(req.body.password, password)) {
        let access_token = sign({ id, email });
        res.status(200).json({ access_token, fullname });
      } else {
        throw createError(400);
      }
    } catch (error) {
      next(error);
    }
  }
  static async google(req, res, next) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: req.body.id_token,
        audience: process.env.CLIENT_ID
      });
      let { name, email } = ticket.getPayload();
      let password = generator.generate({ length: 10, numbers: true });
      let condition = {
        where: {
          email
        }
      };
      let user = await User.findOne(condition);
      if (!user) {
        let { id, email, fullname } = await User.create({
          fullname: name,
          email,
          password
        });
        let access_token = sign({ id, email });
        res.status(201).json({ access_token, fullname });
      } else {
        let access_token = sign({
          id: user.id,
          email: user.email
        });
        res.status(200).json({ access_token, fullname: user.fullname });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
