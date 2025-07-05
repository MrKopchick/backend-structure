const EventService = require('../services/event.service');
const ApiError = require('../utils/apiError');

class EventController {
    async create(req, res, next){
        try{
            const newEvent = await EventService.create(req.body);
            return res.status(201).json(newEvent);
        }catch(err){
            next(err);
        }
    }
    async update(req, res, next){
        try{
            const updatedEvent = await EventService.update(req.id, req.body);
            return res.json(updatedEvent)
        }catch(err){
            next(err);
        }
    }
}

module.exports = new EventController();