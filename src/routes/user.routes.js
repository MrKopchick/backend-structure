const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const { authMiddleware, validate } = require('../middlewares');

const { getUserSchema, createUserSchema, updateUserShema } = require('../models/user.model');

router.post('/', validate(createUserSchema), UserController.create);
router.put('/:id', validate(getUserSchema), authMiddleware, UserController.update);

module.exports = router;