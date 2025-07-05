const UserService = require('../services/user.service');
const ApiError = require('../utils/apiError');

class UserController {
  async create(req, res, next) {
    try {
      const newUser = await UserService.createUser(req.body);
      res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const updatedUser = await UserService.updateUser(req.user.id, req.body);
      res.json(updatedUser);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();