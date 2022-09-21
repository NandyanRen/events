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
        let {name, start_date, end_date} = req.body;
        let event = new Event(name, start_date, end_date)
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