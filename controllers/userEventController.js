const UserEvent = require('../models/UserEvent');

exports.createNewUserEvent  = async (req, res, next) => {
    try{
        let {userId, eventId} = req.body;
        let userEvent = new UserEvent(userId, eventId)
        userEvent = await userEvent.save()
        res.status(201).json({message: "User Event Created"})
    } catch (error) {
        console.log(error);
        next(error);
    }
}

// exports.addUsers = async (req, res, next) => {
//     try{
//         let {name, start_date, end_date} = req.body;
//         let event = new Event(name, start_date, end_date)
//         event = await event.save()
    
//         res.status(201).json({message: "event Created"})
//     } catch (error) {
//         console.log(error);
//         next(error);
//     }
// }

exports.findUserEventById = async(req, res, next) => {
    try {
        let eventId = req.params.id;
        let [event, _] = await Event.findById(eventId)
        res.status(200).json({event: event[0]})
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