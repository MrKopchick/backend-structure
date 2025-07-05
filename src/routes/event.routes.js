const express = require('express');
const router = express.Router();
const EventController = require('../controllers/event.controller');
const { authMiddleware, validate, adminOnly } = require('../middlewares');
const {  
  createEventSchema, 
  updateEventSchema 
} = require('../models/event.model');

router.post(
  '/',
  authMiddleware,
  adminOnly,
  validate(createEventSchema),
  EventController.create
);

router.put(
  '/:id',
  authMiddleware,
  adminOnly,
  validate(updateEventSchema),
  EventController.update
);

module.exports = router;