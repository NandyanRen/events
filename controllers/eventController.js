const Event = require('../models/Event');

exports.getAllEvents = async(req, res, next) => {
    try {
        const [events, _] = await Event.findAll()
        res.status(200).json({events})
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.createNewEvent  = async (req, res, next) => {
    try{
        let {title, start_time, end_time} = req.body;
        let event = new Event(title, start_time, end_time)
        event = await event.save()
        res.status(201).json({message: "event Created"})
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getEventById = async(req, res, next) => {
    try {
        let eventId = req.params.id;
        let [event, _] = await Event.findById(eventId)
        res.status(200).json({event: event[0]})
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.update = async(req, res, next) => {
    try {
        let eventId = req.params.id;
        let {title, start_time, end_time} = req.body
        let event = new Event(title, start_time, end_time)
        event = await event.update(eventId)
        res.status(200).json({ Message: "Event Successfully updated"})
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.destroy = async(req, res, next) => {
    try {
        let eventId = req.params.id;
        await Event.destroy(eventId)
        res.status(201).json({ Message: "Event Successfully Deleted"})
    } catch (error) {
        console.log(error);
        next(error);
    }
}