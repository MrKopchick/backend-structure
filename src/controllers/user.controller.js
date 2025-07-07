const UserService = require('../services/user.service');
const ApiError = require('../utils/apiError');

class UserController {
  async create(req, res, next) {
    try {
      const newUser = await UserService.createUser(req.body);
      res.status(200).json(newUser);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      if (req.user.id !== req.params.id) {
        throw new ApiError(401, 'UserId mismatch');
      }
      const updatedUser = await UserService.updateUser(req.params.id, req.body);
      res.json(updatedUser);
    } catch (err) {
      next(err);
    }
  }

  
  async get(req, res, next) {
      try {
        const user = await UserService.getUserById(req.params.id);
        res.status(200).json(user);
      } catch (err) {
        next(err);
      }
  }
}

module.exports = new UserController();