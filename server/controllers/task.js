const { Task } = require("../models");
const createError = require("http-errors");

class Controller {
  static async all(req, res, next) {
    try {
      let condition = {
        where: {
          UserId: req.user.id
        }
      };
      let task = await Task.findAll(condition);
      res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  }
  static async get(req, res, next) {
    try {
      let condition = {
        where: {
          id: req.params.id
        }
      };
      let task = await Task.findOne(condition);
      if (task) {
        res.status(200).json(task);
      } else {
        throw createError(404);
      }
    } catch (error) {
      next(error);
    }
  }
  static async create(req, res, next) {
    try {
      let inputData = {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        UserId: req.user.id
      };
      let create = await Task.create(inputData);
      res
        .status(201)
        .json({ Message: "Task has successfully created", Data: create });
    } catch (error) {
      next(error);
    }
  }
  static async edit(req, res, next) {
    try {
      let condition = {
        where: {
          id: req.params.id
        }
      };
      let newTask = await Task.update(req.body, condition);
      res
        .status(200)
        .json({ Message: "Succesfully Update Task !", Data: req.body });
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      let condition = {
        where: {
          id: req.params.id
        }
      };
      let deleted = await Task.destroy(condition);
      res.status(200).json({ Message: "Successfully Deleted Task !" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
