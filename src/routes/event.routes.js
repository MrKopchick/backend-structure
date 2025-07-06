const express = require('express');
const router = express.Router();
const EventController = require('../controllers/event.controller');
const { authMiddleware, validate, adminMiddleware } = require('../middlewares');
const {  
  createEventSchema, 
  updateEventSchema 
} = require('../models/event.model');

router.post(
  '/',
  authMiddleware,
  adminMiddleware,
  validate(createEventSchema),
  EventController.create
);

router.put(
  '/:id',
  authMiddleware,
  adminMiddleware,
  validate(updateEventSchema),
  EventController.update
);

module.exports = router;