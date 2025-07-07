const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const { authMiddleware, validate } = require('../middlewares');
const { createUserSchema, updateUserSchema, getUserSchema } = require('../models/user.model');

router.post('/', validate(createUserSchema), UserController.create);
router.put('/:id', validate(updateUserSchema), authMiddleware, UserController.update);
router.get('/:id', validate(getUserSchema, 'params'), UserController.get);

module.exports = router;
